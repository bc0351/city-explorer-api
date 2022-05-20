'use strict';
require('dotenv').config();

const PORT = process.env.PORT || 3002;

const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const getMovies = require('./modules/movies');
const getForecast= require('./modules/weather');

app.get('/', async (req, res, next) => {
  res.send('City Explorer API')
    .catch(error => next(error));
});

app.get('/movies', getMovies);

app.get('/weather', getForecast);

app.get('*', (req, res) => {
  res.send('City not found.');
  console.log('City not found');
})

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
  console.log(error.message);
})

app.listen(PORT, () => console.log(`listening on post ${PORT}`));
