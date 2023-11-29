class Movie {
  constructor(
    title,
    description,
    poster,
    rating,
    releaseYear,
    views,
    category
  ) {
    this.title = title;
    this.description = description;
    this.poster = poster;
    this.rating = rating;
    this.releaseYear = releaseYear;
    this.views = views;
    this.category = category;
  }

  static async fetchDataFromApi(page, url) {
    try {
      const response = await fetch(`${url}&page=${page}`);
      const data = await response.json();

      return data.results;
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
      return [];
    }
  }

  static createMoviesFromApiData(apiData) {
    return apiData.map((movieData) => {
      const posterUrl = movieData.poster_path
        ? `https://image.tmdb.org/t/p/w200${movieData.poster_path}`
        : "";
      const rating = movieData.vote_average;
      const releaseYear = new Date(movieData.release_date).getFullYear();
      const views = movieData.popularity || 0;
      const category = movieData.genre_ids || "Sin categoría";
      return new Movie(
        movieData.title,
        movieData.overview,
        posterUrl,
        rating,
        releaseYear,
        views,
        category
      );
    });
  }

  show(movieContainer, isListView) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const poster = document.createElement("img");
    poster.src = this.poster;
    poster.alt = this.title;

    const title = document.createElement("h2");
    title.textContent = this.title;

    const info = document.createElement("div");
    info.classList.add("info-container");

    const year = document.createElement("h3");
    year.textContent = "Year: " + this.releaseYear;
    info.appendChild(year);

    const rating = document.createElement("h3");
    rating.textContent = "Rating: " + this.rating;
    info.appendChild(rating);

    const description = document.createElement("p");
    description.classList.add("movie-description");
    description.textContent = this.description;

    if (isListView) {
      const views = document.createElement("h3");
      views.textContent = `Vistas: ${this.views}`;

      const categories = document.createElement("h3");
      categories.textContent = determineCategoryById(this.category);

      movieCard.appendChild(views);
    }

    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(info);
    movieCard.appendChild(description);

    movieContainer.appendChild(movieCard);
  }
}

export { Movie };
