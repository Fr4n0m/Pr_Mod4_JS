import { sortMovies } from "./sort-movies.js";
import { showMovies } from "./show-movies.js";
import { Movie } from "../components/movie.js";

let allMovies = [];

async function updateMovies(page, sortBy, sortOrder) {
  const url = determineUrl(sortBy, sortOrder);
  const apiData = await Movie.fetchDataFromApi(page, url);
  const pageMovies = Movie.createMoviesFromApiData(apiData);

  const uniquePageMovies = pageMovies.filter((pageMovie) => {
    return !allMovies.some((movie) => movie.title === pageMovie.title);
  });

  allMovies = [...allMovies, ...uniquePageMovies];
  sortMovies(allMovies, sortBy, sortOrder);
  showMovies(allMovies, movieContainer);
}

function determineUrl(sortBy, sortOrder) {
  const apiKey = "1652dc76432934ad2395900e34623f87";

  switch (sortBy) {
    case "now_playing":
      return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.${sortOrder}&with_release_type=2|3`;
    case "rating":
      return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=es-ES&page=1&sort_by=vote_average.${sortOrder}&without_genres=99,10755&vote_count.gte=200`;
    case "popularity":
      return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.${sortOrder}`;
    case "release_date":
      return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.${sortOrder}`;
    case "views":
      return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.${sortOrder}`;
    case "upcoming":
      return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.${sortOrder}&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`;
    default:
      return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.${sortOrder}`;
  }
}

export { updateMovies, allMovies };
