const express = require('express');
const { getTopics } = require('./controllers/topics.controller');
const { getArticles } = require('./controllers/articles.controller');

const app = express();

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);
app.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

app.use((err, request, response) => {
  response.status(500).send({ msg: 'Internal server error' });
});

module.exports = app;
