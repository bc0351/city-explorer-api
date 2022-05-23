'use strict';

require('dotenv').config();

const axios = require('axios');

const imageUrl = process.env.MOVIE_3_API_IMG_URL;
const baseUrl = process.env.MOVIE_3_API_BASE_URL;

async function getMovies(req, res, next) {
  let params = {
    api_key: process.env.MOVIE_3_API_KEY,
    query: req.query.q,
    sort_by: 'popularity.desc',
    adult: false,
    format: 'json'
  }

  console.log(baseUrl);
  // axios.get(`${baseUrl}/search/movie`, { params })
  //   .then(response => response.data.data.map(movie => { return new Movie(movie) }))
  //   .then(filteredMovies => res.status(200).send(filteredMovies))
  //   .catch(error => next(error));

    await axios.get(`${baseUrl}/search/movie`, { params })
    .then(response => response.data.results.map(movie => {return new Movie(movie)}))
    .then(movies => res.status(200).send(movies))
    .catch(error => next(error));

}

class Movie {
  constructor(movie) {
    this.movie_id = movie.id,
    this.title = movie.title,
    this.overview = movie.overview,
    this.average_votes = movie.vote_average,
    this.total_votes = movie.vote_count,
    this.backdrop_path = movie.backdrop_path,
    this.popularity = movie.popularity,
    this.released_on = movie.release_date
  }
}

class Poster {
  constructor(poster) {
    this.img_url = poser.file_path
  }
}

module.exports = getMovies;
