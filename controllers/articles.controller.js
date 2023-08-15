const { selectArticles, selectArticle } = require('../models/articles.modles');

exports.getArticles = (req, res, next) => {
  return selectArticles()
    .then((articles) => res.status(200).send({ articles }))
    .catch((err) => {
      return next(err);
    });
};

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  return selectArticle(article_id)
    .then((article) => res.status(200).send({ article }))
    .catch((err) => {
      return next(err);
    });
};
