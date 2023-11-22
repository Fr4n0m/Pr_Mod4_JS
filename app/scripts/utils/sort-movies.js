function sortMovies(movies, sortBy, sortOrder) {
  movies.sort((a, b) => {
    const aValue = getSortValue(a, sortBy);
    const bValue = getSortValue(b, sortBy);

    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });
}

function getSortValue(movie, sortBy, category) {
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

async function SortFilterOptions() {
  const sortFilterSelector = document.getElementById("sortFilter");
  const options = await getSortOptionsFromApi();

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = getFilterLabel(option);
    sortFilterSelector.appendChild(optionElement);
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
        "La estructura de datos de opciones de ordenación es incorrecta."
      );
      return [
        "now_playing",
        "rating",
        "popularity",
        "release_date",
        "views",
        "upcoming",
      ];
    }
  } catch (error) {
    console.error("Error al obtener opciones de ordenación de la API:", error);
    return [
      "now_playing",
      "rating",
      "popularity",
      "release_date",
      "views",
      "upcoming",
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

export { sortMovies, SortFilterOptions };
