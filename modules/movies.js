'use strict';
require('dotenv').config('../.env');

let cache = require('./cache.js');
module.exports = getMovies;

const CACHE_CYCLE = 1000 * 60 * 60 * 24 * 14;

const axios = require('axios');

async function getMovies(query) {
  const key = `movies-${query}`;
  const url = `${process.env.MOVIE_3_API_BASE_URL}/search/movie?api_key=${process.env.MOVIE_3_API_KEY}&query=${query}&sort_by=popularity.desc&format=json`;

  if(cache[key] && (Date.now() - cache[key].timestamp < CACHE_CYCLE)) { //Cache timer set to 2 weeks
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(response => response.data.results.map(movie => {return new Movie(movie)}))
      .catch(err => {console.log(err); return undefined;});
    
  }

  console.log(cache);
  return cache[key].data;
}

class Movie {
  constructor(movie) {
    this.movie_id = movie.id,
    this.title = movie.title,
    this.overview = movie.overview,
    this.average_votes = movie.vote_average,
    this.total_votes = movie.vote_count,
    this.poster_path = movie.poster_path,
    this.backdrop_path = movie.backdrop_path,
    this.img_url = `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${process.env.MOVIE_3_API_KEY}&language=en-US`,
    this.popularity = movie.popularity,
    this.released_on = movie.release_date
  }
}
