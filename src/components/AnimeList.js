import React, { useState } from "react";

export default function AnimeList({ title, items }) {
  const [visibleCount, setVisibleCount] = useState(10);

  const visibleItems = items.slice(0, visibleCount);

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2 style={{ marginBottom: "10px" }}>{title}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "15px"
        }}
      >
        {visibleItems.map((a, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "0.2s"
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
          </div>
        ))}
      </div>

      {/* LOAD MORE BUTTON */}
      {visibleCount < items.length && (
        <div className="center">
          <button
            onClick={() => setVisibleCount(prev => prev + 10)}
            style={{ marginTop: "20px" }}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
