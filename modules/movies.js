'use strict';

require('dotenv').config();

const axios = require('axios');

const imageUrl = process.env.MOVIE_3_API_IMG_URL;
const baseUrl = process.env.MOVIE_3_API_BASE_URL;

function getMovies(req, res, next) {
  let params = {
    api_key: process.env.MOVIE_3_API_KEY,
    with_keywords: req.query.keywords,
    sort_by: 'popularity.desc',
    adult: false,
    format: 'json'
  }
  axios.get(baseUrl, { params })
    .then(response => response.data.results.map(movie => { return new Movie(movie) }))
    .then(filteredMovies => res.status(200).send(filteredMovies))
    .catch(error => next(error));
}

class Movie {
  constructor(movie) {
    this.id = movie.id,
    this.title = movie.title,
    this.overview = movie.overview,
    this.average_votes = movie.vote_average,
    this.total_votes = movie.vote_count,
    this.image_url = `${imageUrl}/${movie.id}/images?api_key=${process.env.MOVIE_3_API_KEY}&language=en-US`,
    this.popularity = movie.popularity,
    this.released_on = movie.release_date
  }
}

module.exports = getMovies;
