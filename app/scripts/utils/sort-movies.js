function filterMoviesByCategory(movies, category) {
  return movies.filter(movie => getCategoriesId(movie.category) === getCategoriesId(category));
}

function sortMovies(movies, sortBy, sortOrder, selectedCategory) {
  movies.sort((a, b) => {
    const aValue = getSortValue(a, sortBy);
    const bValue = getSortValue(b, sortBy);

    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  if (selectedCategory) {
    return filterMoviesByCategory(movies, selectedCategory);
  }

  return movies;
}

function getSortValue(movie, sortBy) {
  switch (sortBy) {
    case "now_playing":
      return movie.title;
    case "rating":
      return movie.rating.toString();
    case "popularity":
      return movie.rating.toString();
    case "release_date":
      return movie.releaseYear.toString();
    case "views":
      return movie.title;
    case "upcoming":
      return movie.releaseYear.toString();
    default:
      return "";
  }
}

function getCategoriesId(category) {
  switch (category) {
    case "action":
      return 28;
    case "adventure":
      return 12;
    case "animation":
      return 16;
    case "comedy":
      return 35;
    case "crime":
      return 80;
    case "documentary":
      return 99;
    case "drama":
      return 18;
    case "family":
      return 10751;
    case "fantasy":
      return 14;
    case "history":
      return 36;
    case "horror":
      return 27;
    case "music":
      return 10402;
    case "mystery":
      return 9648;
    case "romance":
      return 10749;
    case "science_fiction":
      return 878;
    case "tv_movie":
      return 10770;
    case "thriller":
      return 53;
    case "war":
      return 10752;
    case "western":
      return 37;
    default:
      return 28;
  }
}

async function sortFilterOptions() {
  const sortFilterSelector = document.getElementById("sortFilter");
  const options = await getSortOptionsFromApi();

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = getFilterLabel(option);
    sortFilterSelector.appendChild(optionElement);
  });
}

async function sortCategoryOptions() {
  const sortCategorySelector = document.getElementById("sortCategory");
  const options = await getSortOptionsCategoryFromApi();

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.id.toString();
    optionElement.textContent = getFilterLabelCategory(option.name);
    sortCategorySelector.appendChild(optionElement);
  });
}

async function getSortOptionsFromApi() {
  const apiKey = "1652dc76432934ad2395900e34623f87";
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("API Response:", data);

    if (data.sort_by && Array.isArray(data.sort_by)) {
      return data.sort_by;
    } else {
      console.error(
        "La estructura de datos de opciones de categoría es incorrecta."
      );
      return [
        "now_playing",
        "rating",
        "popularity",
        "release_date",
        "views",
        "upcoming"
      ];
    }
  } catch (error) {
    console.error("Error al obtener opciones de categoría de la API:", error);
    return [
      "now_playing",
      "rating",
      "popularity",
      "release_date",
      "views",
      "upcoming"
    ];
  }
}

async function getSortOptionsCategoryFromApi() {
  const apiKey = "1652dc76432934ad2395900e34623f87";
  const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log("API Response:", data);

    if (data.genres && Array.isArray(data.genres)) {
      return data.genres;
    } else {
      console.error("La estructura de datos de opciones de ordenación es incorrecta.");
      return [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 14, name: "Fantasy" },
        { id: 36, name: "History" },
        { id: 27, name: "Horror" },
        { id: 10402, name: "Music" },
        { id: 9648, name: "Mystery" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 10770, name: "TV Movie" },
        { id: 53, name: "Thriller" },
        { id: 10752, name: "War" },
        { id: 37, name: "Western" },
      ];
    }
  } catch (error) {
    console.error("Error al obtener opciones de ordenación de la API:", error);
    return [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: 36, name: "History" },
      { id: 27, name: "Horror" },
      { id: 10402, name: "Music" },
      { id: 9648, name: "Mystery" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: 10770, name: "TV Movie" },
      { id: 53, name: "Thriller" },
      { id: 10752, name: "War" },
      { id: 37, name: "Western" },
    ];
  }
}

function getFilterLabel(filter) {
  switch (filter) {
    case "now_playing":
      return "Now playing";
    case "rating":
      return "Top Rated";
    case "popularity":
      return "Popular";
    case "release_date":
      return "Release date";
    case "views":
      return "Views";
    case "upcoming":
      return "Upcoming";
    default:
      return filter;
  }
}

function getFilterLabelCategory(filter) {
  switch (filter) {
    case "action":
      return "Action";
    case "adventure":
      return "Adventure";
    case "animation":
      return "Animation";
    case "comedy":
      return "Comedy";
    case "crime":
      return "Crime";
    case "documentary":
      return "Documentary";
    case "drama":
      return "Drama";
    case "family":
      return "Family";
    case "fantasy":
      return "Fantasy";
    case "history":
      return "History";
    case "horror":
      return "Horror";
    case "music":
      return "Music";
    case "mystery":
      return "Mystery";
    case "romance":
      return "Romance";
    case "science_fiction":
      return "Science Fiction";
    case "tv_movie":
      return "TV Movie";
    case "thriller":
      return "Thriller";
    case "war":
      return "War";
    case "western":
      return "Western";
    default:
      return filter;
  }
}

/* determineCategoryById(categories) {
  const movie_categories = [];
  categories.forEach(genre_id => {
    genres.forEach(genre => {
      if (genre_id === genre) {
        movie_categories += genre;
      }
    });
  });
} */

export { sortMovies, sortFilterOptions, sortCategoryOptions, filterMoviesByCategory };
