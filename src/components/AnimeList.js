import React from "react";

export default function AnimeList({ title, items }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}
