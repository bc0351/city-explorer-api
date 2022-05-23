'use strict';
require('dotenv').config();

const PORT = process.env.PORT || 3002;

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const movies = require('./modules/movies');
const weather = require('./modules/weather');

app.get('/', (req, res, next) => {
  res.send('City Explorer API')
    .catch(error => next(error));
});

app.get('/movies', movieHandler);

app.get('/weather', weather);

app.get('*', (req, res) => {
  res.send('City not found.');
  console.log('City not found');
})

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).send(error.message);
})

function movieHandler(req, res) {
  const {query} = req.query;
  movies(query)
    .then(selectedMovies => res.send(selectedMovies))
    .catch((err) => { console.log(err); res.status(500).send('Internal server error.')});
}

app.listen(PORT, () => console.log(`listening on post ${PORT}`));
