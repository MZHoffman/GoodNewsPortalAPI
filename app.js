const express = require('express');
const { getTopics } = require('./controllers/topics.controller');
const { getAPIDescription } = require('./controllers/endpoits.controller');
const { getArticle } = require('./controllers/articles.controller');

const app = express();

app.get('/api/topics', getTopics);
app.get('/api', getAPIDescription);
app.get('/api/articles/:article_id', getArticle);

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

app.use((err, request, response) => {
  response.status(500).send({ msg: 'Internal server error!' });
});

module.exports = app;
