const API_URL = "https://graphql.anilist.co";

export async function fetchUser(username) {
  const query = `
    query ($name: String) {
      MediaListCollection(userName: $name, type: ANIME) {
        lists {
          entries {
            status
            score
            media {
              title { romaji }
              genres
            }
          }
        }
      }
    }
  `;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { name: username }
    })
  });

  const json = await res.json();

  const completed = {};
  const planning = new Set();

  json.data.MediaListCollection.lists.forEach(list => {
    list.entries.forEach(e => {
      const title = e.media.title.romaji;

      if (e.status === "COMPLETED") {
        completed[title] = {
          score: e.score,
          genres: e.media.genres
        };
      }

      if (e.status === "PLANNING") {
        planning.add(title);
      }
    });
  });

  return { completed, planning };
}
