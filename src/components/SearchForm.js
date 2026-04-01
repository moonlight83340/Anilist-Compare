import React, { useState, useRef } from "react";
import { searchUsers } from "../api";

export default function SearchForm({ onCompare }) {
  const [userA, setUserA] = useState("");
  const [userB, setUserB] = useState("");

  const [suggestionsA, setSuggestionsA] = useState([]);
  const [suggestionsB, setSuggestionsB] = useState([]);

  const timeoutRef = useRef(null);

  function handleSearch(value, setSuggestions) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (value.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const results = await searchUsers(value);
        setSuggestions(results);
      } catch (e) {
        console.error("API error:", e);
        setSuggestions([]);
      }
    }, 300);
  }

  return (
    <div style={{ marginBottom: 20 }}>

      {/* USER A */}
      <div
        style={{
          position: "relative",
          marginBottom: 10,
          zIndex: 20,
          width: "220px",
          marginInline: "auto"
        }}
      >
        <input
          placeholder="User A"
          value={userA}
          style={{ width: "100%" }}
          onChange={(e) => {
            setUserA(e.target.value);
            handleSearch(e.target.value, setSuggestionsA);
          }}
        />

        {suggestionsA.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              marginTop: "5px",
              background: "#1a1a1a",
              borderRadius: "8px",
              overflow: "hidden",
              zIndex: 999,
              boxShadow: "0 8px 20px rgba(0,0,0,0.6)"
            }}
          >
            {suggestionsA.map((user, i) => (
              <div
                key={i}
                onClick={() => {
                  setUserA(user.name);
                  setSuggestionsA([]);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  cursor: "pointer",
                  background: "#222",
                  transition: "background 0.15s"
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#333")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#222")
                }
              >
                <img
                  src={user.avatar?.medium}
                  alt=""
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%"
                  }}
                />
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* USER B */}
      <div
        style={{
          position: "relative",
          marginBottom: 10,
          zIndex: 10,
          width: "220px",
          marginInline: "auto"
        }}
      >
        <input
          placeholder="User B"
          value={userB}
          style={{ width: "100%" }}
          onChange={(e) => {
            setUserB(e.target.value);
            handleSearch(e.target.value, setSuggestionsB);
          }}
        />

        {suggestionsB.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              marginTop: "5px",
              background: "#1a1a1a",
              borderRadius: "8px",
              overflow: "hidden",
              zIndex: 999,
              boxShadow: "0 8px 20px rgba(0,0,0,0.6)"
            }}
          >
            {suggestionsB.map((user, i) => (
              <div
                key={i}
                onClick={() => {
                  setUserB(user.name);
                  setSuggestionsB([]);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px",
                  cursor: "pointer",
                  background: "#222",
                  transition: "background 0.15s"
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#333")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#222")
                }
              >
                <img
                  src={user.avatar?.medium}
                  alt=""
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%"
                  }}
                />
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="center">
        <button onClick={() => onCompare(userA, userB)}>
          Compare
        </button>
      </div>
    </div>
  );
}
