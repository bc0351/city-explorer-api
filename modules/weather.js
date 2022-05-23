'use strict';

require('dotenv').config('../.env');
require('./cache.js');

const axios = require('axios');

const baseUrl = process.env.WEATHER_API_BASE_URL;
const apiKey = process.env.WEATHER_API_KEY;

async function getForecast(req, res, next) {
  let params = {
    key: apiKey,
    lat: req.query.lat || '40.730610',
    lon: req.query.lon || '-73.935242',
    units: 'I'
  }
  await axios.get(baseUrl, { params })
    .then(response => response.data.data.map(forecast => { return new Forecast(forecast) }))
    .then(filteredCities => res.status(200).send(filteredCities))
    .catch(error => next(error));
}

class Forecast {
  constructor(forecast) {
    this.date = forecast.datetime,
    this.description = `Low of ${forecast.low_temp}, high of ${forecast.high_temp} with ${forecast.weather.description.toLowerCase()}.`
  }
}

module.exports = getForecast;
