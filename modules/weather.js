'use strict';

require('dotenv').config();

const axios = require('axios').default;

const baseUrl = process.env.WEATHER_API_BASE_URL;

async function getMovies(req, res, next) {
  let params = {
    api_key: process.env.MOVIE_3_API_KEY,
    with_keywords: req.query.keywords,
    sort_by: 'popularity.desc',
    adult: false,
    format: 'json'
  };
  
  return await axios.get(baseUrl, { params })
    .then(response => response.data.results.map(movie => { return new Movie(movie) }))
    .then(filteredMovies => res.status(200).send(filteredMovies))
    .catch(error => next(error));
}

class Forecast {
  constructor(forecast) {
    this.rh = forecast.rh,
      this.pod = forecast.pod,
      this.lon = forecast.lon,
      this.pres = forecast.pres,
      this.timezone = forecast.timezone,
      this.ob_time = forecast.ob_time,
      this.country_code = forecast.country_code,
      this.clouds = forecast.clouds,
      this.ts = forecast.ts,
      this.solar_rad = forecast.solar_rad,
      this.state_code = forecast.state_code,
      this.city_name = forecast.city_name,
      this.wind_spd = forecast.wind_spd,
      this.wind_cdir_full = forecast.wind_cdir_full,
      this.wind_cdir = forecast.wind_cdir,
      this.slp = forecast.slp,
      this.vis = forecast.vis,
      this.h_angle = forecast.h_angle,
      this.sunset = forecast.sunset,
      this.dni = forecast.dni,
      this.dewpt = forecast.dewpt,
      this.snow = forecast.snow,
      this.uv = forecast.uv,
      this.precip = forecast.precip,
      this.wind_dir = forecast.wind_dir,
      this.sunrise = forecast.sunrise,
      this.ghi = forecast.ghi,
      this.dhi = forecast.dhi,
      this.aqi = forecast.aqi,
      this.lat = forecast.lat,
      this.weather_icon = forecast.weather.icon,
      this.weather_code = forecast.weather.code,
      this.weather_description = forecast.weather.description,
      this.datetime = forecast.datetime,
      this.temp = forecast.temp,
      this.station = forecast.station,
      this.elev_angle = forecast.elev_angle,
      this.app_temp = forecast.app_temp
  }
}


module.exports = getMovies;
