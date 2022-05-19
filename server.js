'use strict';
require('dotenv').config();

const PORT = process.env.PORT || 3002;
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send(`Weather Data API`);
})

app.get('/location', async (req, res, next) => {
  try {
    let urlUS = `${process.env.LOCATION_IQ_US_BASE_URL}?key=${process.env.LOCATION_IQ_API_KEY}&q=${req.query.city}&format=json`;
    let urlEU = `${process.env.LOCATION_IQ_EU_BASE_URL}?key=${process.env.LOCATION_IQ_API_KEY}&q=${req.query.city}&format=json`;
    let results = await axios.get(urlUS) ? await axios.get(urlUS) : await axios.get(urlEU);
    let locations = results.map(result => {return new Location(result)});
    console.log(results);
    res.send(locations)
  } catch (err) {
    console.log(Object.entries(err));
    next(err);
  }
})

app.get('/weather', async (req, res, next) => {
  try {
    let url = `${process.env.WEATHER_API_BASE_URL}?key=${process.env.WEATHER_API_KEY}&city=${req.query.city}&units=I`;
    console.log(req.query.searchQuery);
    console.log(url);
    let results =  await axios.get(url);
    console.log(results);
    let forecasts = [];
    console.log(results.data.data);
    results.data.data.map(result => {forecasts.push(new Forecast(result))});
    res.send(forecasts);
  } catch (err) {
    console.log(Object.entries(err));
    next(err);
  }
})

app.get('*', (req, res) => {
  res.send('City not found.');
  console.log('City not found');
})

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
  console.log(error.message);
})

class Location {
  constructor(location) {
    this.place_id = location.place_id
    this.licence = location.licence
    this.osm_type = location.osm_type
    this.osm_id = location.osm_id
    this.boundingbox = location.boundingbox
    this.lat = location.lat
    this.lon = location.lon
    this.display_name = location.display_name
    this.class = location.class
    this.type = location.type
    this.importance = location.importance
    this.icon = location.icon
  }
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
    this.weather = forecast.weather,
    this.weather.icon = forecast.weather.icon,
    this.weather.code = forecast.weather.code,
    this.weather.description = forecast.weather.description,
    this.datetime = forecast.datetime,
    this.temp = forecast.temp,
    this.station = forecast.station,
    this.elev_angle = forecast.elev_angle,
    this.app_temp = forecast.app_temp
  }
}

app.listen(PORT, () => console.log(`listening on post ${PORT}`));
