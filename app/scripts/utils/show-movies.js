
function showMovies(movies, container, isListView) {
  container.innerHTML = "";

  if (movies.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No se encontraron películas ;(";
    noResultsMessage.classList.add("no-results-message");
    container.appendChild(noResultsMessage);
  } else {
    movies.forEach((movie) => movie.show(container, isListView));
  }
}

export { showMovies };
