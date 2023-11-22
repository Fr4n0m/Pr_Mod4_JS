class Movie {
  constructor(title, description, poster, rating, releaseYear, views, category) {
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
      const views = movieData.views || 0;
      const category = movieData.category || "Sin categoría";
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

    const description = document.createElement("p");
    description.classList.add("movie-description");
    description.textContent = this.description;

    if (isListView) {
      const rating = document.createElement("p");
      rating.textContent = `Rating: ${this.rating}`;
      const releaseYear = document.createElement("p");
      releaseYear.textContent = `Año de lanzamiento: ${this.releaseYear}`;
      const views = document.createElement("p");
      views.textContent = `Vistas: ${this.views}`;
      movieCard.appendChild(rating);
      movieCard.appendChild(releaseYear);
      movieCard.appendChild(views);
    }

    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(description);

    movieContainer.appendChild(movieCard);
  }
}

export { Movie };
