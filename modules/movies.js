'use strict';
require('dotenv').config('../.env');

let cache = require('./cache.js');

module.exports = getMovies;

const axios = require('axios');

function getMovies(query) {
  const key = `movies-${query}`;
  const url = `${process.env.MOVIE_3_API_BASE_URL}/search/movie?api_key=${process.env.MOVIE_3_API_KEY}&query=${query}&sort_by=popularity.desc&adult=false&format=json`;
  
  console.log(key);
  console.log(url);

  if(cache[key] && (Date.now() - cache[key].timestamp < 86400000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseMovies(response));
  }
  console.log(cache[key].data);
  return cache[key].data;
}

function parseMovies(movieData) {
  try {
    const movieInfo = movieData.data.results.map(movie => {return new Movie(movie)});
    return Promise.resolve(movieInfo);
  } catch (err) {
    return Promise.reject(err);
  }
}

class Movie {
  constructor(movie) {
    this.movie_id = movie.id,
    this.title = movie.title,
    this.overview = movie.overview,
    this.average_votes = movie.vote_average,
    this.total_votes = movie.vote_count,
    this.backdrop_img_url = (movie.backdrop_path) ? `https://image.tmdb.org/t/p/w300${movie.backdrop_path}` : '',
    this.poster_img_url = (movie.backdrop_path) ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : '',
    this.popularity = movie.popularity,
    this.released_on = movie.release_date
  }
}
