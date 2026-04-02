import React from "react";
import AnimeList from "./AnimeList";
import { getRank, getRankColor, getRankDescription } from "../compare";

export default function Results({ data, users }) {
  if (!data) return null;

  const rank = getRank(data.compatibility);
  const color = getRankColor(rank);
  const description = getRankDescription(data.compatibility);

  const toAniList = (name, type = "anime") => {
    return `https://anilist.co/search/${type}?search=${encodeURIComponent(name)}`;
  };

  const FavGrid = ({ items, type }) => {
    if (!items || items.length === 0) {
      return (
        <div style={{ opacity: 0.5, fontStyle: "italic", marginTop: 8 }}>
          Nothing in Common!
        </div>
      );
    }

    return (
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        marginTop: "12px"
      }}>
        {items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              color: "inherit",
              textAlign: "center",
              width: "80px"
            }}
          >
            <img
              src={type === "anime" ? item.cover : item.image}
              alt=""
              style={{
                width: 80,
                height: 110,
                objectFit: "cover",
                borderRadius: "8px",
                border: "2px solid rgba(255,255,255,0.1)"
              }}
            />
            <div style={{
              fontSize: "0.7rem",
              marginTop: "4px",
              opacity: 0.8,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}>
              {type === "anime" ? item.title : item.name}
            </div>
          </a>
        ))}
      </div>
    );
  };

  /* ── petit composant top 10 en deux colonnes ── */
  const FavColumns = ({ listA, listB, type }) => (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
      marginTop: "15px"
    }}>
      {[listA, listB].map((list, i) => (
        <div key={i} style={{ flex: 1 }}>
          <strong>{i === 0 ? users.A : users.B}</strong>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            marginTop: "8px"
          }}>
            {(list || []).slice(0, 10).map((item, j) => (
              <a
                key={j}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                  color: type === "anime" ? "#a78bfa" : "#f472b6"
                }}
              >
                <img
                  src={type === "anime" ? item.cover : item.image}
                  alt=""
                  style={{
                    width: 32,
                    height: 44,
                    objectFit: "cover",
                    borderRadius: "4px"
                  }}
                />
                <span style={{ fontSize: "0.85rem" }}>
                  {type === "anime" ? item.title : item.name}
                </span>
              </a>
            ))}
            {(!list || list.length === 0) && (
              <span style={{ opacity: 0.4, fontStyle: "italic" }}>
                No favourites
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {/* HEADER */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        borderRadius: "16px",
        padding: "30px 40px",
        marginBottom: "40px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>

          {/* USER A */}
          <a
            href={`https://anilist.co/user/${users.A}`}
            target="_blank"
            rel="noreferrer"
            style={{ textAlign: "center", textDecoration: "none", color: "inherit" }}
          >
            <img src={users.avatarA} alt=""
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                border: "3px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 20px rgba(0,0,0,0.4)"
              }}
            />
            <div style={{
              marginTop: "12px",
              fontSize: "1.4rem",
              fontWeight: "bold"
            }}>
              {users.A}
            </div>
          </a>

          {/* COMPATIBILITY */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px dashed rgba(255,255,255,0.1)",
            padding: "25px 45px",
            borderRadius: "16px",
            textAlign: "center"
          }}>
            <div style={{
              fontSize: "0.7rem",
              letterSpacing: "4px",
              textTransform: "uppercase",
              opacity: 0.5,
              marginBottom: "10px"
            }}>
              Compatibility
            </div>

            {/* Score + Rank sur la même ligne */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px"
            }}>
              <span style={{ fontSize: "3.5rem", fontWeight: "bold" }}>
                {data.compatibility}%
              </span>
              <span style={{
                fontSize: "3.5rem",
                fontWeight: "900",
                color,
                textShadow: `0 0 20px ${color}40`
              }}>
                {rank}
              </span>
            </div>

            {/* Description */}
            <div style={{
              marginTop: "10px",
              fontSize: "0.8rem",
              opacity: 0.5,
              maxWidth: "280px",
              lineHeight: 1.4
            }}>
              {description}
            </div>
          </div>

          {/* USER B */}
          <a
            href={`https://anilist.co/user/${users.B}`}
            target="_blank"
            rel="noreferrer"
            style={{ textAlign: "center", textDecoration: "none", color: "inherit" }}
          >
            <img src={users.avatarB} alt=""
              style={{
                width: 140,
                height: 140,
                borderRadius: "50%",
                border: "3px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 20px rgba(0,0,0,0.4)"
              }}
            />
            <div style={{
              marginTop: "12px",
              fontSize: "1.4rem",
              fontWeight: "bold"
            }}>
              {users.B}
            </div>
          </a>

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
              <td>{data.statsA.totalHours}h ({data.statsA.totalDays}d)</td>
              <td>Time Watched</td>
              <td>{data.statsB.totalHours}h ({data.statsB.totalDays}d)</td>
            </tr>
            <tr>
              <td>{data.statsA.meanScore}</td>
              <td>Mean Score</td>
              <td>{data.statsB.meanScore}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* WATCH PROGRESS */}
      <div className="card">
        <h2>Watch Progress</h2>
        {[data.progressA, data.progressB].map((p, i) => (
          <div key={i} style={{ marginTop: "20px" }}>
            <strong>{i === 0 ? users.A : users.B}</strong>
            <div style={{
              height: "12px", borderRadius: "10px", overflow: "hidden",
              background: "rgba(255,255,255,0.1)", marginTop: "8px", display: "flex"
            }}>
              <div style={{ width: `${p.completedPercent}%`, background: "linear-gradient(90deg, #22c55e, #4ade80)" }} />
              <div style={{ width: `${p.watchingPercent}%`, background: "linear-gradient(90deg, #38bdf8, #60a5fa)" }} />
              <div style={{ width: `${p.planningPercent}%`, background: "linear-gradient(90deg, #6366f1, #818cf8)" }} />
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: "0.85rem", opacity: 0.7, marginTop: "5px",
              flexWrap: "wrap", gap: "10px"
            }}>
              <span>✔ {p.completed} ({p.completedPercent}%)</span>
              <span>👀 {p.watching} ({p.watchingPercent}%)</span>
              <span>📌 {p.planning} ({p.planningPercent}%)</span>
            </div>
          </div>
        ))}
      </div>

      {/* RELEASE YEAR */}
      <div className="card">
        <h2>Release Year Stats</h2>
        {Object.keys(data.yearA || {}).map(year => {
          const A = data.yearA[year];
          const B = data.yearB[year];
          const diff = (A.meanScore - B.meanScore).toFixed(2);
          return (
            <div key={year} style={{
              display: "flex", justifyContent: "space-between", marginTop: "10px"
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
                  <a href={toAniList(tag)} target="_blank" rel="noreferrer"
                    style={{ color: "#a78bfa" }}>{tag}</a>
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
                  <a href={toAniList(s)} target="_blank" rel="noreferrer"
                    style={{ color: "#34d399" }}>{s}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, opacity: 0.7 }}>
          Common: {data.commonStudios?.join(", ") || "Nothing in common"}
        </div>
      </div>

      <div className="card">
        <h2>❤️ Common Favourite Anime</h2>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "10px"
        }}>
          <div style={{
            flex: 1, height: "10px", borderRadius: "10px",
            background: "rgba(255,255,255,0.1)", overflow: "hidden"
          }}>
            <div style={{
              width: `${data.commonFavAnimePercent}%`,
              height: "100%",
              background: "linear-gradient(90deg, #a78bfa, #c084fc)",
              borderRadius: "10px",
              transition: "width 0.5s ease"
            }} />
          </div>
          <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            {data.commonFavAnimePercent}%
          </span>
        </div>

        <FavGrid items={data.commonFavAnime} type="anime" />

        <FavColumns
          listA={data.favAnimeA}
          listB={data.favAnimeB}
          type="anime"
        />
      </div>

      <div className="card">
        <h2>💜 Common Favourite Characters</h2>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "10px"
        }}>
          <div style={{
            flex: 1, height: "10px", borderRadius: "10px",
            background: "rgba(255,255,255,0.1)", overflow: "hidden"
          }}>
            <div style={{
              width: `${data.commonFavCharactersPercent}%`,
              height: "100%",
              background: "linear-gradient(90deg, #f472b6, #fb7185)",
              borderRadius: "10px",
              transition: "width 0.5s ease"
            }} />
          </div>
          <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            {data.commonFavCharactersPercent}%
          </span>
        </div>

        <FavGrid items={data.commonFavCharacters} type="character" />

        <FavColumns
          listA={data.favCharactersA}
          listB={data.favCharactersB}
          type="character"
        />
      </div>

      {/* LISTS */}
      <AnimeList title={`🔥 Recommended from ${users.B}`} items={data.recommendations} userB={users.B} />
      <AnimeList title="🤝 Common anime" items={data.common} userA={users.A} userB={users.B} />
      <AnimeList title={`📺 Only watched by ${users.A}`} items={data.uniqueA} userA={users.A} />
      <AnimeList title={`📺 Only watched by ${users.B}`} items={data.uniqueB} userB={users.B} />
    </div>
  );
}