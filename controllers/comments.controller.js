const { selectArticle } = require('../models/articles.modles');
const { selectCommentsForArticle } = require('../models/comments.models');

exports.getCommentsForArticle = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [
    selectCommentsForArticle(article_id),
    selectArticle(article_id),
  ];
  return Promise.all(promises)
    .then((resplvedPromises) => {
      return res.status(200).send({ comments: resplvedPromises[0] });
    })
    .catch((err) => {
      return next(err);
    });
};
