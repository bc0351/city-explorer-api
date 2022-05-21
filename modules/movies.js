'use strict';

require('dotenv').config();

const imageUrl = process.env.MOVIE_3_API_IMG_URL;
const baseURL = process.env.MOVIE_3_API_BASE_URL;
const apiKey = process.env.MOVIE_3_API_KEY;

const axios = require('axios').default;

async function getMovies(req, res, next) {
  let params = {
    api_key: apiKey,
    query: req.query.q,
    sort_by: 'popularity.desc',
    adult: false,
    format: 'json'
  };

  return await axios.get(`${baseURL}/search/movie`, { params })
    .then(response => response.data.results.map(movie => { console.log(`movie.js.line 37: ${movie}`); return new Movie(movie) }))
    .then(filteredMovies => res.status(200).send(filteredMovies))
    .catch((error) => {res.status(500).send(error.message); console.log(error.message);});

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
