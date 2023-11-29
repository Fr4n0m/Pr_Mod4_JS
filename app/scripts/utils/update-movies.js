import { sortMovies } from "./sort-movies.js";
import { showMovies } from "./show-movies.js";
import { Movie } from "../components/movie.js";

let allMovies = [];

async function updateMovies(page, sortBy, sortOrder, selectedCategory) {

  console.log("Parámetros recibidos:", page, sortBy, sortOrder, selectedCategory);

  const url = determineUrl(sortBy, sortOrder, selectedCategory);
  const apiData = await Movie.fetchDataFromApi(page, url);
  const pageMovies = Movie.createMoviesFromApiData(apiData);

  const uniquePageMovies = pageMovies.filter((pageMovie) => {
    return !allMovies.some((movie) => movie.title === pageMovie.title);
  });

  allMovies = [...allMovies, ...uniquePageMovies];
  sortAndShowMovies(allMovies, sortBy, sortOrder, selectedCategory);
}

function determineUrl(sortBy, sortOrder, selectedCategory) {
  const apiKey = "1652dc76432934ad2395900e34623f87";
  const baseApiUrl = "https://api.themoviedb.org/3/discover/movie";
  const language = "es-ES";
  const page = 1;

  let specificUrl;

  switch (sortBy) {
    case "now_playing":
      specificUrl = `&sort_by=popularity.${sortOrder}&with_release_type=2|3`;
      break;
    case "rating":
      specificUrl = `&sort_by=vote_average.${sortOrder}&without_genres=99,10755&vote_count.gte=200`;
      break;
    case "popularity":
      specificUrl = `&sort_by=popularity.${sortOrder}`;
      break;
    case "release_date":
      specificUrl = `&sort_by=popularity.${sortOrder}`;
      break;
    case "views":
      specificUrl = `&sort_by=popularity.${sortOrder}`;
      break;
    case "upcoming":
      specificUrl = `&sort_by=popularity.${sortOrder}&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`;
      break;
    default:
      specificUrl = `&sort_by=popularity.${sortOrder}`;
  }

  if (selectedCategory) {
    specificUrl += `&with_genres=${selectedCategory}`;
  }

  return `${baseApiUrl}?api_key=${apiKey}&include_adult=false&include_video=false&language=${language}&page=${page}${specificUrl}`;
}

function sortAndShowMovies(movies, sortBy, sortOrder, selectedCategory) {
  const filteredAndSortedMovies = sortMovies(movies, sortBy, sortOrder, selectedCategory);
  showMovies(filteredAndSortedMovies, movieContainer);
}


export { updateMovies, allMovies };
