import React from "react";
import AnimeList from "./AnimeList";
import { getRank, getRankColor } from "../compare";

export default function Results({ data, users }) {
  if (!data) return null;

  const rank = getRank(data.compatibility);
  const color = getRankColor(rank);

  const toAniList = (name, type = "anime") => {
    return `https://anilist.co/search/${type}?search=${encodeURIComponent(name)}`;
  };

  return (
    <div>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "40px"
      }}>

        <div style={{ textAlign: "center" }}>
          <img src={users.avatarA} alt=""
            style={{ width: 120, height: 120, borderRadius: "50%" }} />
          <div>{users.A}</div>
        </div>

        <div style={{
          background: "rgba(255,255,255,0.05)",
          padding: "25px 40px",
          borderRadius: "15px",
          textAlign: "center"
        }}>
          <div style={{ opacity: 0.6 }}>COMPATIBILITY</div>

          <h2 style={{ fontSize: "3rem" }}>
            {data.compatibility}%
          </h2>

          <div style={{
            fontSize: "4rem",
            fontWeight: "bold",
            color
          }}>
            {rank}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <img src={users.avatarB} alt=""
            style={{ width: 120, height: 120, borderRadius: "50%" }} />
          <div>{users.B}</div>
        </div>
      </div>

      {/* WATCH STATS */}
      <div className="card">
        <h2>Watch Stats</h2>

        <table>
          <tbody>
            <tr>
              <td>{data.statsA.totalAnime}</td>
              <td>Anime Completed</td>
              <td>{data.statsB.totalAnime}</td>
            </tr>
            <tr>
              <td>{data.statsA.totalEpisodes}</td>
              <td>Episodes Watched</td>
              <td>{data.statsB.totalEpisodes}</td>
            </tr>
            <tr>
              <td>
                {data.statsA.totalHours}h ({data.statsA.totalDays}d)
              </td>
              <td>Time Watched</td>
              <td>
                {data.statsB.totalHours}h ({data.statsB.totalDays}d)
              </td>
            </tr>
            <tr>
              <td>{data.statsA.meanScore}</td>
              <td>Mean Score</td>
              <td>{data.statsB.meanScore}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 🔥 WATCH PROGRESSION */}
      <div className="card">
        <h2>Watch Progress</h2>

        {[data.progressA, data.progressB].map((p, i) => (
          <div key={i} style={{ marginTop: "20px" }}>
            <strong>{i === 0 ? users.A : users.B}</strong>

            {/* BAR */}
            <div
              style={{
                height: "12px",
                borderRadius: "10px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.1)",
                marginTop: "8px",
                display: "flex"
              }}
            >
              {/* COMPLETED */}
              <div
                style={{
                  width: `${p.completedPercent}%`,
                  background: "linear-gradient(90deg, #22c55e, #4ade80)"
                }}
              />
            
              {/* WATCHING */}
              <div
                style={{
                  width: `${p.watchingPercent}%`,
                  background: "linear-gradient(90deg, #38bdf8, #60a5fa)" // 🔵
                }}
              />
            
              {/* PLANNING */}
              <div
                style={{
                  width: `${p.planningPercent}%`,
                  background: "linear-gradient(90deg, #6366f1, #818cf8)"
                }}
              />
            </div>

            {/* LABELS */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.85rem",
              opacity: 0.7,
              marginTop: "5px",
              flexWrap: "wrap",
              gap: "10px"
            }}>
              <span>✔ {p.completed} ({p.completedPercent}%)</span>
              <span>👀 {p.watching} ({p.watchingPercent}%)</span>
              <span>📌 {p.planning} ({p.planningPercent}%)</span>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 RELEASE YEAR FIXED */}
      <div className="card">
        <h2>Release Year Stats</h2>

        {Object.keys(data.yearA || {}).map(year => {
          const A = data.yearA[year];
          const B = data.yearB[year];

          const diff = (A.meanScore - B.meanScore).toFixed(2);

          return (
            <div key={year} style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px"
            }}>
              <span>{A.proportion}%</span>

              <span style={{ opacity: 0.7 }}>
                {year} ({diff > 0 ? "+" : ""}{diff})
              </span>

              <span>{B.proportion}%</span>
            </div>
          );
        })}
      </div>

      {/* GENRES */}
      <div className="card">
        <h2>Top Genres</h2>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <strong>{users.A}</strong>
            <div>{data.genresA?.join(", ")}</div>
          </div>

          <div>
            <strong>{users.B}</strong>
            <div>{data.genresB?.join(", ")}</div>
          </div>
        </div>
      </div>

      {/* TAGS */}
      <div className="card">
        <h2>Top Tags</h2>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {[data.tagsA, data.tagsB].map((tags, i) => (
            <div key={i}>
              <strong>{i === 0 ? users.A : users.B}</strong>

              {tags?.map(tag => (
                <div key={tag}>
                  <a
                    href={toAniList(tag)}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#a78bfa" }} // 🔥 FIX couleur
                  >
                    {tag}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 10, opacity: 0.7 }}>
          Common: {data.commonTags?.join(", ") || "Nothing in common"}
        </div>
      </div>

      {/* STUDIOS */}
      <div className="card">
        <h2>Top Studios</h2>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {[data.studiosA, data.studiosB].map((studios, i) => (
            <div key={i}>
              <strong>{i === 0 ? users.A : users.B}</strong>

              {studios?.map(s => (
                <div key={s}>
                  <a
                    href={toAniList(s)}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#34d399" }} // 🔥 FIX couleur
                  >
                    {s}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 10, opacity: 0.7 }}>
          Common: {data.commonStudios?.join(", ") || "Nothing in common"}
        </div>
      </div>

      {/* LISTS */}
      <AnimeList title={`🔥 Recommended from ${users.B}`} items={data.recommendations} />
      <AnimeList title="🤝 Common anime" items={data.common} />
      <AnimeList title={`📺 Only watched by ${users.A}`} items={data.uniqueA} />
      <AnimeList title={`📺 Only watched by ${users.B}`} items={data.uniqueB} />

    </div>
  );
}