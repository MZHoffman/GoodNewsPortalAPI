const { selectArticles } = require('../models/articles.modles');

exports.getArticles = (req, res, next) => {
  return selectArticles()
    .then((articles) => res.status(200).send({ articles }))
    .catch((err) => {
      return next(err);
    });
};
