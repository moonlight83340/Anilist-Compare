import React from "react";
import AnimeList from "./AnimeList";

export default function Results({ data }) {
  if (!data) return null;

  return (
    <div>
      <AnimeList title="Recommendations" items={data.recommendations} />
      <AnimeList title="Common" items={data.common} />
      <AnimeList title="Unique to A" items={data.uniqueA} />
      <AnimeList title="Unique to B" items={data.uniqueB} />
    </div>
  );
}
