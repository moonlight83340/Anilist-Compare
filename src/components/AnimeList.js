import React, { useState } from "react";

function ScoreBadge({ label, score, position }) {
  if (!score || score === 0) return null;

  const color =
    score >= 8 ? "#4ade80" :
    score >= 6 ? "#eab308" :
    "#ef4444";

  return (
    <div
      style={{
        position: "absolute",
        top: "8px",
        [position]: "8px",
        background: "rgba(0,0,0,0.75)",
        borderRadius: "6px",
        padding: "3px 7px",
        fontSize: "0.7rem",
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1.3
      }}
    >
      <span style={{ opacity: 0.5, fontSize: "0.55rem" }}>{label}</span>
      <span style={{ color }}>★ {score}</span>
    </div>
  );
}

export default function AnimeList({ title, items, userA, userB }) {
  const [visibleCount, setVisibleCount] = useState(10);

  if (!items || items.length === 0) return null;

  const visibleItems = items.slice(0, visibleCount);

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "10px" }}>
        {title}
        <span style={{ fontSize: "0.85rem", opacity: 0.5, marginLeft: "10px" }}>
          ({items.length})
        </span>
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "15px"
        }}
      >
        {visibleItems.map((a, i) => {
          const avgDisplay = a.averageScore
            ? (a.averageScore / 10).toFixed(1)
            : null;

          return (
            <a
              key={i}
              href={a.url}
              target="_blank"
              rel="noreferrer"
              style={{
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "0.2s",
                textDecoration: "none",
                color: "inherit",
                display: "block"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={a.cover || "https://via.placeholder.com/150"}
                alt=""
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover"
                }}
              />

              {/* Score User A — top left */}
              <ScoreBadge
                label={userA || "A"}
                score={a.scoreA}
                position="left"
              />

              {/* Score User B — top right */}
              <ScoreBadge
                label={userB || "B"}
                score={a.scoreB}
                position="right"
              />

              {/* Average AniList — center bottom */}
              {avgDisplay && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "42px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(0,0,0,0.7)",
                    borderRadius: "6px",
                    padding: "2px 8px",
                    fontSize: "0.7rem",
                    whiteSpace: "nowrap"
                  }}
                >
                  <span style={{ opacity: 0.5 }}>AVG </span>
                  <span style={{ color: "#60a5fa" }}>★ {avgDisplay}</span>
                </div>
              )}

              {/* Title */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  padding: "10px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                }}
              >
                <span style={{ fontSize: "0.9rem" }}>{a.title}</span>
              </div>
            </a>
          );
        })}
      </div>

      {/* LOAD MORE */}
      {visibleCount < items.length && (
        <div className="center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            style={{ marginTop: "20px" }}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}