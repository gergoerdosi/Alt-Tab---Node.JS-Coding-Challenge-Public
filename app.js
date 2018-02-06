'use strict';

const MongoClient = require('mongodb').MongoClient;
const express = require('express');

const app = express();
module.exports = app;

app.use(require('body-parser').json());
app.use('/api', require('./app_api/api'));

app.on('connected', () => {
  app.listen(3000, () => {
    console.log('Listening on port 3000.');
  });
});

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    throw err;
  }

  app.set('mongo', client.db('upstack'));
  app.emit('connected');
});
