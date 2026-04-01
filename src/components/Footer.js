import React from "react";

export default function Footer() {
  return (
    <footer style={{
      marginTop: "60px",
      padding: "30px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      textAlign: "center",
      fontSize: "0.9rem",
      opacity: 0.8
    }}>

      {/* TITLE */}
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
        AniList Compare Tool
      </div>

      {/* LINKS */}
      <div style={{ marginBottom: "10px" }}>
        <a
          href="https://anilist.co"
          target="_blank"
          rel="noreferrer"
          style={{ marginRight: "15px", color: "#a78bfa" }}
        >
          AniList
        </a>

        <a
          href="https://github.com/moonlight83340"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#34d399" }}
        >
          GitHub
        </a>
      </div>

      {/* DISCLAIMER */}
      <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>
        Data provided by AniList API. This project is not affiliated with AniList.
      </div>

      {/* BACK TO TOP */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          marginTop: "15px",
          cursor: "pointer",
          color: "#60a5fa"
        }}
      >
        ↑ Back to top
      </div>

    </footer>
  );
}