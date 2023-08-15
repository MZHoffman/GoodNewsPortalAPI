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

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    next(err);
  }
});

app.use((err, req, respresonse) => {
  res.status(500).send({ msg: 'Internal server error!' });
});

module.exports = app;
