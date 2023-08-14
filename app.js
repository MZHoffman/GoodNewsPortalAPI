const express = require('express');
const { getTopics } = require('./controllers/topics.controller');

const app = express();

app.get('/api/topics', getTopics);

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

app.use((err, request, response) => {
  response.status(500).send({ msg: 'Internal server error' });
});

module.exports = app;
