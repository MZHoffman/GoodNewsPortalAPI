const { selectArticle } = require('../models/articles.modles');
const {
  selectCommentsForArticle,
  insertCommentForArticle,
} = require('../models/comments.models');

exports.getCommentsForArticle = (req, res, next) => {
  const { article_id } = req.params;
  const promises = [
    selectCommentsForArticle(article_id),
    selectArticle(article_id),
  ];
  return Promise.all(promises)
    .then((resolvedPromises) => {
      return res.status(200).send({ comments: resolvedPromises[0] });
    })
    .catch((err) => {
      return next(err);
    });
};

exports.postCommentsForArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  return insertCommentForArticle(article_id, username, body)
    .then((comment) => {
      return res.status(200).send({ comment });
    })
    .catch((err) => {
      return next(err);
    });
};
