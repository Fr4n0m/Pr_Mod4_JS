import { searchMovies } from "./utils/search-movies.js";
import { showMovies } from "./utils/show-movies.js";
import { sortFilterOptions, sortCategoryOptions } from "./utils/sort-movies.js";
import { updateMovies, allMovies } from "./utils/update-movies.js"

document.addEventListener("DOMContentLoaded", async function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const toggleViewButton = document.getElementById("toggleViewButton");
  const movieContainer = document.getElementById("movieContainer");
  const sortButton = document.getElementById("sortButton");
  const sortFilterSelector = document.getElementById("sortFilter");
  const sortOrderSelector = document.getElementById("sortOrder");
  const sortCategorySelector = document.getElementById("sortCategory");

  let currentPage = 1;

  await updateMovies(currentPage, "now_playing", "desc");
  showMovies(allMovies, movieContainer);

  // Cambiar vista
  toggleViewButton.addEventListener("click", function () {
    const isListView = movieContainer.classList.toggle("list-view");
    showMovies(allMovies, movieContainer, isListView);
  });

  // Expandir resumen
  movieContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("movie-description")) {
      event.target.classList.toggle("expanded");
    }
  });

  // Search
  searchButton.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
      const searchData = searchMovies(searchTerm, allMovies);
      showMovies(searchData, movieContainer);
    }
  });

  // Search when enter
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== "") {
        const searchData = searchMovies(searchTerm, allMovies);
        showMovies(searchData, movieContainer);
      }
    }
  });

  // Pagination
  document.getElementById("loadMoreButton").addEventListener("click", async function () {
    currentPage++;
    await updateMovies(currentPage, sortFilterSelector.value, sortOrderSelector.value);
  });

  await sortFilterOptions(), sortCategoryOptions();

  // Sort
  sortButton.addEventListener("click", async function () {
    const selectedCategory = sortCategorySelector.value;
    const sortBy = sortFilterSelector.value;
    const sortOrder = sortOrderSelector.value;
    await updateMovies(currentPage, sortBy, sortOrder, selectedCategory);
  });

  sortCategorySelector.addEventListener("change", function () {
    const selectedCategory = sortCategorySelector.value;
    const sortBy = sortFilterSelector.value;
    const sortOrder = sortOrderSelector.value;
    console.log("Categoría seleccionada:", selectedCategory);
    updateMovies(currentPage, sortBy, sortOrder, selectedCategory);
  });
});