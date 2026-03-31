import React, { useState } from "react";
import { fetchUser } from "./api";
import { compareUsers } from "./compare";
import SearchForm from "./components/SearchForm";
import Results from "./components/Results";

export default function App() {
  const [results, setResults] = useState(null);

  async function handleCompare(userA, userB) {
    const A = await fetchUser(userA);
    const B = await fetchUser(userB);

    const res = compareUsers(A, B);
    setResults(res);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>AniList Compare</h1>
      <SearchForm onCompare={handleCompare} />
      <Results data={results} />
    </div>
  );
}
