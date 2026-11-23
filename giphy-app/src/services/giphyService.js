const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = "https://api.giphy.com/v1/gifs/search";

// Llama a la API de Giphy con fetch y devuelve la lista de gifs
export async function buscarGifs(texto, signal) {
  if (!API_KEY) {
    throw new Error("Falta la API key. Revisa el archivo .env (VITE_GIPHY_API_KEY)");
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    q: texto,
    limit: 25,
    offset: 0,
    rating: "g",
    lang: "en",
  });

  const resp = await fetch(`${BASE_URL}?${params}`, { signal });

  // fetch no lanza error con 401, 404 o 429: hay que revisar res.ok
  if (!resp.ok) {
    if (resp.status === 401 || resp.status === 403) throw new Error("API key inválida");
    if (resp.status === 429) throw new Error("Demasiadas peticiones, intenta en un momento");
    throw new Error(`Error ${resp.status} al consultar Giphy`);
  }

  const json = await resp.json();
  return json.data.map((g) => ({
    id: g.id,
    titulo: g.title,
    url: g.images.fixed_height.url,
  }));
}