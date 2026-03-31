import React, { useState } from "react";

export default function SearchForm({ onCompare }) {
  const [userA, setUserA] = useState("");
  const [userB, setUserB] = useState("");

  return (
    <div>
      <input
        placeholder="User A"
        value={userA}
        onChange={e => setUserA(e.target.value)}
      />
      <input
        placeholder="User B"
        value={userB}
        onChange={e => setUserB(e.target.value)}
      />
      <button onClick={() => onCompare(userA, userB)}>
        Compare
      </button>
    </div>
  );
}
