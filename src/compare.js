function topN(map, n = 10) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}

function intersection(a = [], b = []) {
  return a.filter(x => b.includes(x));
}

function computeStats(user) {
  const completed = Object.values(user.completed);

  const totalAnime = completed.length;

  const totalEpisodes = completed.reduce(
    (acc, a) => acc + (a.episodes || 0) * (1 + (a.repeat || 0)),
    0
  );

  const totalMinutes = completed.reduce(
    (acc, a) =>
      acc +
      (a.episodes || 0) *
      (a.duration || 24) *
      (1 + (a.repeat || 0)),
    0
  );

  const totalHours = Math.round(totalMinutes / 60);
  const totalDays = (totalHours / 24).toFixed(1);

  const scored = completed.filter(a => a.score > 0);

  const meanScore =
    scored.reduce((acc, a) => acc + a.score, 0) /
    (scored.length || 1);

  return {
    totalAnime,
    totalEpisodes,
    totalHours,
    totalDays,
    meanScore: meanScore.toFixed(2)
  };
}

function computeYearStats(user) {
  const completed = Object.values(user.completed);

  const decades = {
    "1970s": [],
    "1980s": [],
    "1990s": [],
    "2000s": [],
    "2010s": [],
    "2020s": []
  };

  completed.forEach(a => {
    if (!a.year) return;

    const decade = Math.floor(a.year / 10) * 10;

    const key = `${decade}s`;
    if (decades[key]) {
      decades[key].push(a);
    }
  });

  const totalEpisodes = completed.reduce((acc, a) => acc + a.episodes, 0);

  const result = {};

  Object.entries(decades).forEach(([decade, list]) => {
    const episodes = list.reduce((acc, a) => acc + a.episodes, 0);

    const proportion = totalEpisodes
      ? Math.round((episodes / totalEpisodes) * 100)
      : 0;

    const scored = list.filter(a => a.score > 0);
    const mean =
      scored.reduce((acc, a) => acc + a.score, 0) /
      (scored.length || 1);

    result[decade] = {
      proportion,
      meanScore: mean.toFixed(2)
    };
  });

  return result;
}

function computeTopGenres(user) {
  const map = {};

  Object.values(user.completed).forEach(a => {
    (a.genres || []).forEach(g => {
      map[g] = (map[g] || 0) + 1;
    });
  });

  return topN(map, 5);
}

function computeTags(user) {
  const map = {};

  Object.values(user.completed).forEach(a => {
    (a.tags || []).forEach(t => {
      map[t] = (map[t] || 0) + 1;
    });
  });

  return topN(map, 10);
}

function computeStudios(user) {
  const map = {};

  Object.values(user.completed).forEach(a => {
    (a.studios || []).forEach(s => {
      map[s] = (map[s] || 0) + 1;
    });
  });

  return topN(map, 10);
}

function computeProgress(user) {
  const completedCount = Object.keys(user.completed).length;
  const planningCount = user.planning.size;
  const watchingCount = user.watching?.size || 0;

  const total = completedCount + planningCount + watchingCount;

  const completedPercent = total
    ? Math.round((completedCount / total) * 100)
    : 0;

  const planningPercent = total
    ? Math.round((planningCount / total) * 100)
    : 0;

  const watchingPercent = total
    ? Math.round((watchingCount / total) * 100)
    : 0;

  return {
    completed: completedCount,
    planning: planningCount,
    watching: watchingCount,

    completedPercent,
    planningPercent,
    watchingPercent
  };
}

function computeCommonFavAnime(A, B) {
  const setA = new Set(A.favouriteAnime.map(a => a.title));
  const common = B.favouriteAnime.filter(a => setA.has(a.title));

  const totalUnique = new Set([
    ...A.favouriteAnime.map(a => a.title),
    ...B.favouriteAnime.map(a => a.title)
  ]).size;

  const percent = totalUnique
    ? Math.round((common.length / totalUnique) * 100)
    : 0;

  return { common, percent };
}

function computeCommonFavCharacters(A, B) {
  const setA = new Set(A.favouriteCharacters.map(c => c.name));
  const common = B.favouriteCharacters.filter(c => setA.has(c.name));

  const totalUnique = new Set([
    ...A.favouriteCharacters.map(c => c.name),
    ...B.favouriteCharacters.map(c => c.name)
  ]).size;

  const percent = totalUnique
    ? Math.round((common.length / totalUnique) * 100)
    : 0;

  return { common, percent };
}

function computeCompatibility(A, B) {
  const common = Object.keys(A.completed).filter(
    t => t in B.completed
  );

  if (common.length === 0) return 5;

  const ratio =
    common.length /
    Math.max(
      Object.keys(A.completed).length,
      Object.keys(B.completed).length
    );

  let scoreDiff = 0;
  let count = 0;

  common.forEach(title => {
    const a = A.completed[title].score;
    const b = B.completed[title].score;

    if (a === 0 || b === 0) return;

    scoreDiff += Math.abs(a - b);
    count++;
  });

  let scoreSimilarity = 50;

  if (count > 0) {
    const avg = scoreDiff / count;
    scoreSimilarity = Math.max(0, 100 - avg * 10);
  }

  return Math.round(ratio * 50 + scoreSimilarity * 0.5);
}

export function getRank(score) {
  if (score >= 90) return "S";
  if (score >= 75) return "A";
  if (score >= 60) return "B";
  if (score >= 45) return "C";
  if (score >= 30) return "D";
  if (score >= 15) return "E";
  return "F";
}

export function getRankColor(rank) {
  switch (rank) {
    case "S": return "#22c55e";
    case "A": return "#4ade80";
    case "B": return "#84cc16";
    case "C": return "#eab308";
    case "D": return "#f97316";
    case "E": return "#ef4444";
    default: return "#dc2626";
  }
}

export function getRankDescription(score) {
  if (score >= 90) return "Soulmates. You basically share the same brain.";
  if (score >= 75) return "Amazing chemistry — your watch lists are practically twins.";
  if (score >= 60) return "Solid match! You'd have plenty to talk about at a con.";
  if (score >= 45) return "Decent overlap — enough common ground to vibe.";
  if (score >= 30) return "Some shared interests, but your tastes diverge quite a bit.";
  if (score >= 15) return "A small spark of agreement — at least you both like anime.";
  return "Complete opposites. One loves what the other skips.";
}

export function compareUsers(A, B) {
  const A_completed = A.completed;
  const B_completed = B.completed;

  const A_planning_titles = new Set([...A.planning]);

  const recommendations = Object.values(B_completed)
    .filter(a => A_planning_titles.has(a.title))
    .sort((a, b) => b.score - a.score)
    .map(a => ({
      ...a,
      scoreB: a.score,
      scoreA: null
    }));

  const common = Object.values(A_completed)
    .filter(a => a.title in B_completed)
    .map(a => ({
      ...a,
      scoreA: a.score,
      scoreB: B_completed[a.title].score
    }));

  const uniqueA = Object.values(A_completed)
    .filter(a => !(a.title in B_completed))
    .map(a => ({
      ...a,
      scoreA: a.score,
      scoreB: null
    }));

  const uniqueB = Object.values(B_completed)
    .filter(a => !(a.title in A_completed))
    .map(a => ({
      ...a,
      scoreB: a.score,
      scoreA: null
    }));

  const tagsA = computeTags(A);
  const tagsB = computeTags(B);

  const studiosA = computeStudios(A);
  const studiosB = computeStudios(B);

  const favAnime = computeCommonFavAnime(A, B);
  const favCharacters = computeCommonFavCharacters(A, B);

  return {
    recommendations,
    common,
    uniqueA,
    uniqueB,

    compatibility: computeCompatibility(A, B),

    statsA: computeStats(A),
    statsB: computeStats(B),

    progressA: computeProgress(A),
    progressB: computeProgress(B),

    yearA: computeYearStats(A),
    yearB: computeYearStats(B),

    genresA: computeTopGenres(A),
    genresB: computeTopGenres(B),

    tagsA,
    tagsB,
    commonTags: intersection(tagsA, tagsB),

    studiosA,
    studiosB,
    commonStudios: intersection(studiosA, studiosB),
    favAnimeA: A.favouriteAnime,
    favAnimeB: B.favouriteAnime,
    commonFavAnime: favAnime.common,
    commonFavAnimePercent: favAnime.percent,

    favCharactersA: A.favouriteCharacters,
    favCharactersB: B.favouriteCharacters,
    commonFavCharacters: favCharacters.common,
    commonFavCharactersPercent: favCharacters.percent
  };
}
