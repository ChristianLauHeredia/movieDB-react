const axios = require('axios');
const base_url = "https://api.themoviedb.org/3";
const api_key = "1585adf2b051bcdd1ff8aad6a95f588f";
import i18n from "i18next";

export async function getCustomQuery (customParams, page = 1) {
  const lang = i18n.language === "en" ? "en-EN" : "es-ES";
  const data = await axios.get(`${base_url}${customParams}?api_key=${api_key}&language=${lang}&page=${page}`)
    .then((result) => {
      return (result.data.results);
    })
    .catch(() => {
      return [];
    })
  return data;
}

export async function getMovieDetails (id) {
  const lang = i18n.language === "en" ? "en-EN" : "es-ES";
  const data = await axios.get(`${base_url}/movie/${id}?api_key=${api_key}&language=${lang}`)
    .then((result) => {
      return(result.data);
    })
    .catch(() => {
      return {};
    })
  return data;
}
