
function searchMovies(searchTerm, movies) {
  if (movies) {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    console.error("Error: La lista de películas no está definida.");
    return [];
  }
}

export { searchMovies };
