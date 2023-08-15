const { selectArticle } = require('../models/articles.modles');
const { selectCommentsForArticle } = require('../models/comments.models');

exports.getCommentsForArticle = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [
    selectCommentsForArticle(article_id),
    selectArticle(article_id),
  ];
  return Promise.all(promises)
    .then((comments) => {
      return res.status(200).send({ comments: comments[0] });
    })
    .catch((err) => {
      return next(err);
    });
};
