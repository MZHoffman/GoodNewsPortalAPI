const express = require('express');
const articles = require('./routes/articles.routes');
const { getTopics } = require('./controllers/topics.controller');
const { getAPIDescription } = require('./controllers/endpoits.controller');
const {
  getCommentsForArticle,
  postCommentsForArticle,
  removeComment,
} = require('./controllers/comments.controller');
const { getUsers } = require('./controllers/users.controller');
const {
  generalError,
  Error400,
  Error404,
  Error500,
  pathError,
} = require('./errors');

const app = express();
app.use(express.json());

app.use('/api/articles', articles);

app.get('/api/topics', getTopics);
app.get('/api', getAPIDescription);
app.get('/api/articles/:article_id/comments', getCommentsForArticle);
app.post('/api/articles/:article_id/comments', postCommentsForArticle);
app.delete('/api/comments/:comment_id', removeComment);
app.get('/api/users', getUsers);

app.all('*', pathError);
app.use(generalError);
app.use(Error400);
app.use(Error404);
app.use(Error500);

module.exports = app;
