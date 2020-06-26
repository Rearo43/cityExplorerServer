'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const superagent = require('superagent');
const PORT = process.env.PORT;
const app = express();


app.use(cors());

// Routes
app.get('/', home);
app.get('/location', location);
app.get('/weather', weather);
// app.get('/hiking', hiking);

function home(req, resp){
  resp.status(200).send('Working?');
}

function location(req, resp){
  let dataLocation = require('./data/location.json');
  let newData = new Location(dataLocation[0], req.query.city);

  resp.status(200).json(newData);
}

function Location(info, city){
  this.latitude = info.lat;
  this.longitude = info.lon;
  this.formatted_query = info.display_name;
  this.search_query = city;
}

function weather(req, resp){
  let dataWeather = require('./data/weather.json');
  let allWeather = [];

  dataWeather.data.forEach(dayData => {
    let weather = new Weather(dayData);
    allWeather.push(weather);

  });
  console.log(allWeather);
  resp.status(200).json(allWeather);

}

function Weather(info){
  let getDate = new Date(info.datetime);

  this.forcast = info.weather.description;
  this.datetime = getDate.toDateString();
}

app.use('*', (req,resp) => {
  resp.status(404).send('Could Not Find!');
});

app.use((error, req, resp, next) => {
  // console.log(error);
  resp.status(500).send('Broken Server!');
});

app.listen( PORT, () => console.log('Working?', PORT));



