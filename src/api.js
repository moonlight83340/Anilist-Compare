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
              siteUrl
              coverImage { large }
            }
          }
        }
      }

      User(name: $name) {
        avatar { large }

        favourites {
          anime {
            nodes {
              title { romaji }
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

  const favNodes = json.data?.User?.favourites?.anime?.nodes || [];

  const favourites = new Set(
    favNodes.map(a => a.title?.romaji).filter(Boolean)
  );

  return {
    completed,
    planning,
    watching,
    favourites,
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
    body: JSON.stringify({
      query,
      variables: { search: queryText }
    })
  });

  const json = await res.json();
  return json.data?.Page?.users || [];
}
