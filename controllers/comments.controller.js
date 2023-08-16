const { selectArticle } = require('../models/articles.modles');
const {
  selectCommentsForArticle,
  insertCommentForArticle,
  deleteComment,
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
      comment.created_at = new Date(
        new Date(comment.created_at).setMilliseconds(0)
      ).toISOString();
      return res.status(200).send({ comment });
    })
    .catch((err) => {
      return next(err);
    });
};

exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  return deleteComment(comment_id)
    .then((deletedComments) => {
      console.log('🚀 ~ .then ~ comment:', deletedComments);
      if (!deletedComments) {
        return Promise.reject({ status: 404, msg: 'Not found' });
      }
      return res.status(204).send();
    })
    .catch((err) => {
      console.log('🚀 ~ err:', err);
      return next(err);
    });
};
