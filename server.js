'use strict';
require('dotenv').config();
const PORT = process.env.REACT_APP_PORT1 || process.env.REACT_APP_PORT2;
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let dataArr = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send(`Weather Data API`);
})

app.get('/weather', (request, response, next) => {
  try {
    let requestData = request.query.searchQuery;
    let foundData = dataArr.filter(obj => obj.city_name === requestData)[0].data;
    console.log(foundData)
    let forecastArr = foundData.map((dailyObj) => new Forecast({
      description: `Low of ${dailyObj.app_min_temp}, high of ${dailyObj.app_max_temp} with ${dailyObj.weather.description.toLowerCase()}`,
      date: dailyObj.valid_date
    }));
    response.send(forecastArr);
    console.log(responseData);
  } catch (e) {
    next(e);
  }
})

app.get('*', (request, response) => {
  response.send('City not found.');
  console.log('City not found');
})

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
  console.log(error.message);
})


class Forecast {
  constructor(forecastObject) {
    this.description = forecastObject.description;
    this.date = forecastObject.date;
  }
}

app.listen(PORT, () => console.log(`listening on post ${PORT}`));
