const API_URL = "https://graphql.anilist.co";

export async function fetchUser(username) {
  const query = `
    query ($name: String) {
      MediaListCollection(userName: $name, type: ANIME) {
        lists {
          entries {
            status
            score
            repeat
            media {
              title { romaji }
              genres
              tags { name }
              episodes
              duration
              startDate { year }
              studios { nodes { name } }
              averageScore
              siteUrl
              coverImage { large }
            }
          }
        }
      }

      User(name: $name) {
        avatar { large }

        favourites {
          anime(perPage: 25) {
            nodes {
              title { romaji }
              siteUrl
              coverImage { large }
            }
          }
          characters(perPage: 25) {
            nodes {
              name { full }
              siteUrl
              image { large }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { name: username } })
  });

  const json = await res.json();
  const lists = json.data?.MediaListCollection?.lists || [];

  const completed = {};
  const planning = new Set();
  const watching = new Set();

  lists.forEach(list => {
    list.entries?.forEach(e => {
      if (!e?.media) return;
      const title = e.media.title?.romaji;
      if (!title) return;

      const animeData = {
        title,
        score: e.score || 0,
        genres: e.media.genres || [],
        tags: e.media.tags?.map(t => t.name) || [],
        studios: e.media.studios?.nodes?.map(s => s.name) || [],
        episodes: e.media.episodes || 0,
        duration: e.media.duration || 24,
        repeat: e.repeat || 0,
        year: e.media.startDate?.year,
        averageScore: e.media.averageScore || null,
        url: e.media.siteUrl || null,
        cover: e.media.coverImage?.large || null
      };

      if (e.status === "COMPLETED") {
        completed[title] = animeData;
      }

      if (e.status === "PLANNING") {
        planning.add(title);
      }
      if (e.status === "CURRENT") {
        watching.add(title);
      }
    });
  });

  // ── Favourite Anime ──
  const favAnimeNodes = json.data?.User?.favourites?.anime?.nodes || [];
  const favouriteAnime = favAnimeNodes.map(a => ({
    title: a.title?.romaji,
    url: a.siteUrl || null,
    cover: a.coverImage?.large || null
  })).filter(a => a.title);

  // ── Favourite Characters ──
  const favCharNodes = json.data?.User?.favourites?.characters?.nodes || [];
  const favouriteCharacters = favCharNodes.map(c => ({
    name: c.name?.full,
    url: c.siteUrl || null,
    image: c.image?.large || null
  })).filter(c => c.name);

  return {
    completed,
    planning,
    watching,
    favouriteAnime,
    favouriteCharacters,
    avatar: json.data?.User?.avatar?.large || null
  };
}

export async function searchUsers(queryText) {
  const query = `
    query ($search: String) {
      Page(perPage: 5) {
        users(search: $search) {
          name
          avatar { medium }
        }
      }
    }
  `;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { search: queryText } })
  });

  const json = await res.json();
  return json.data?.Page?.users || [];
}