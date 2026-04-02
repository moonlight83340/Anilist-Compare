import React from "react";
import { getRankColor } from "../compare";

const ranks = [
  { rank: "S", range: "90-100%", desc: "Soulmates. You basically share the same brain.", emoji: "💚" },
  { rank: "A", range: "75-89%",  desc: "Amazing chemistry — your watch lists are practically twins.", emoji: "💙" },
  { rank: "B", range: "60-74%",  desc: "Solid match! You'd have plenty to talk about at a con.", emoji: "💛" },
  { rank: "C", range: "45-59%",  desc: "Decent overlap — enough common ground to vibe.", emoji: "🧡" },
  { rank: "D", range: "30-44%",  desc: "Some shared interests, but your tastes diverge quite a bit.", emoji: "🔶" },
  { rank: "E", range: "15-29%",  desc: "A small spark of agreement — at least you both like anime.", emoji: "❗" },
  { rank: "F", range: "0-14%",   desc: "Complete opposites. One loves what the other skips.", emoji: "💔" }
];

const sections = [
  {
    title: "🎯 Compatibility Score",
    text: `The compatibility percentage is calculated from two factors: the ratio of shared anime between both users, and how similarly they scored those shared anime. A higher overlap with closer scores means a higher match.`
  },
  {
    title: "📊 Watch Stats",
    text: `Shows total anime completed, episodes watched (including rewatches), total time spent, and mean score for each user side by side.`
  },
  {
    title: "📈 Watch Progress",
    text: `Visualizes the breakdown of each user's list into Completed, Watching, and Planning with a color-coded bar.`
  },
  {
    title: "📅 Release Year Stats",
    text: `Compares what proportion of each user's watch time falls into each decade (1970s–2020s), along with the difference in mean score per era.`
  },
  {
    title: "🎭 Genres, Tags & Studios",
    text: `Displays each user's top genres, tags, and studios by frequency, along with what they have in common.`
  },
  {
    title: "❤️ Favourite Anime & Characters",
    text: `Pulled directly from each user's AniList favourites. Shows a percentage of overlap and lists what's shared between both users.`
  },
  {
    title: "🔥 Recommendations",
    text: `Anime that User B has completed and scored, which User A has in their Planning list. Sorted by User B's score — essentially "what your friend thinks you should watch next."`
  },
  {
    title: "🤝 Common & Unique Anime",
    text: `Common shows both users completed. Unique lists show what only one user has seen. Each card displays both users' scores (when available) and the AniList community average.`
  }
];

export default function Info({ onBack }) {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          <span style={{ color: "white" }}>AniList </span>
          <span style={{ color: "#3b82f6" }}>Compare</span>
        </h1>
        <p style={{ opacity: 0.6 }}>How does it work?</p>

        <button
          onClick={onBack}
          style={{
            marginTop: "15px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "inherit",
            padding: "8px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "0.9rem"
          }}
        >
          ← Back to Compare
        </button>
      </div>

      {/* Rank Table */}
      <div className="card" style={{ marginBottom: "30px" }}>
        <h2 style={{ marginBottom: "20px" }}>🏆 Rank System</h2>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          {ranks.map(({ rank, range, desc, emoji }) => (
            <div
              key={rank}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "12px 16px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)"
              }}
            >
              {/* Rank badge */}
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                fontWeight: "900",
                color: getRankColor(rank),
                background: `${getRankColor(rank)}15`,
                border: `2px solid ${getRankColor(rank)}30`,
                flexShrink: 0
              }}>
                {rank}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px"
                }}>
                  <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>
                    {emoji}
                  </span>
                  <span style={{
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    color: getRankColor(rank)
                  }}>
                    {range}
                  </span>
                </div>
                <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Explanations */}
      <div className="card" style={{ marginBottom: "30px" }}>
        <h2 style={{ marginBottom: "20px" }}>📖 Features Explained</h2>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          {sections.map(({ title, text }) => (
            <div key={title}>
              <h3 style={{
                fontSize: "1.1rem",
                marginBottom: "6px"
              }}>
                {title}
              </h3>
              <p style={{
                fontSize: "0.9rem",
                opacity: 0.7,
                lineHeight: 1.6,
                margin: 0
              }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Source */}
      <div className="card" style={{ marginBottom: "30px" }}>
        <h2 style={{ marginBottom: "15px" }}>🔗 Data Source</h2>
        <p style={{ fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.6 }}>
          All data is fetched in real-time from the{" "}
          <a
            href="https://anilist.co"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#3b82f6" }}
          >
            AniList
          </a>{" "}
          GraphQL API. No data is stored — everything is computed on the fly
          in your browser. Your list must be{" "}
          <strong style={{ opacity: 1 }}>public</strong> for the comparison
          to work.
        </p>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "20px",
        opacity: 0.4,
        fontSize: "0.8rem"
      }}>
        Built with React • Powered by the AniList API
      </div>
    </div>
  );
}