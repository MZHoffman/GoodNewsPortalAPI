const express = require('express');
const { getTopics } = require('./controllers/topics.controller');
const {
  getArticles,
  getArticle,
  patchArticle,
} = require('./controllers/articles.controller');
const { getAPIDescription } = require('./controllers/endpoits.controller');
const {
  getCommentsForArticle,
  postCommentsForArticle,
  removeComment,
} = require('./controllers/comments.controller');
const { getUsers } = require('./controllers/users.controller');

const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api', getAPIDescription);
app.get('/api/articles/:article_id', getArticle);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id/comments', getCommentsForArticle);
app.post('/api/articles/:article_id/comments', postCommentsForArticle);
app.patch('/api/articles/:article_id', patchArticle);
app.delete('/api/comments/:comment_id', removeComment);
app.get('/api/users', getUsers);

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
  if (err.code === '22P02' || err.code === '23502') {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  if (err.code === '23503') {
    res.status(404).send({ msg: 'Not found' });
  } else {
    next(err);
  }
});

app.use((err, req, respresonse) => {
  res.status(500).send({ msg: 'Internal server error!' });
});

module.exports = app;
