import React, { useState } from "react";
import { fetchUser } from "./api";
import { compareUsers } from "./compare";
import SearchForm from "./components/SearchForm";
import Results from "./components/Results";
import Footer from "./components/Footer";
import Info from "./components/Info";
import "./styles.css";

export default function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("home");

  const [users, setUsers] = useState({
    A: "",
    B: "",
    avatarA: "",
    avatarB: ""
  });

  async function handleCompare(userA, userB) {
    try {
      setLoading(true);
      setResults(null);

      const [A, B] = await Promise.all([
        fetchUser(userA),
        fetchUser(userB)
      ]);

      const res = compareUsers(A, B);

      setUsers({
        A: userA,
        B: userB,
        avatarA: A.avatar,
        avatarB: B.avatar
      });

      setResults(res);
    } catch (err) {
      console.error(err);
      alert("Error fetching users 😢");
    } finally {
      setLoading(false);
    }
  }

  // ── PAGE INFO ──
  if (page === "info") {
    return (
      <div className="app">
        <main className="container">
          <Info onBack={() => setPage("home")} />
        </main>
        <Footer />
      </div>
    );
  }

  // ── PAGE HOME ──
  return (
    <div className="app">

      <main className="container">

        <div className="header">
          <h1 className="title">AniList Compare</h1>
          <p className="subtitle">
            Compare anime taste between two users
          </p>

          <button
            onClick={() => setPage("info")}
            style={{
              marginTop: "10px",
              background: "none",
              border: "none",
              color: "#3b82f6",
              cursor: "pointer",
              fontSize: "0.85rem",
              opacity: 0.7
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "1"}
            onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}
          >
            ℹ️ How does it work?
          </button>
        </div>

        <SearchForm onCompare={handleCompare} />

        {loading && (
          <div className="loading">Loading users...</div>
        )}

        {results && !loading && (
          <Results data={results} users={users} />
        )}

      </main>

      <Footer />

    </div>
  );
}