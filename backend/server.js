'use strict';
require("dotenv").config();

const path = require('path');
const express = require('express');
const parking = require('./services/parking');

const PORT = process.env.NODE_DOCKER_PORT || 8080;


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, '../frontend/build')));

app.get('/api/available', async function(req, res, next) {
  try {
    res.json(await parking.getParking());
  } catch (err) {
    console.error(`Error while getting parking `, err.message);
    next(err);
  }
});

app.post('/api/assigned', async function(req, res, next) {
  try {
    res.json(await parking.reserveParking(req.body.location));
  } catch (err) {
    console.error(`Error while assigning parking `, err.message);
    next(err);
  }
})

app.get('/api/reset', async function(req, res, next) {
  try {
    res.json(await parking.resetParking());
  } catch (err) {
    console.error(`Error while getting parking `, err.message);
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});