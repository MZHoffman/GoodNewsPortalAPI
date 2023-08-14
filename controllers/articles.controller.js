const { selectArticle } = require('../models/articles.modles');

exports.getArticle = (req, res, next) => {
  console.log('🚀 ~ req:', req.params.article_id);
  const { article_id } = req.params;
  return selectArticle(article_id).then((article) =>
    res.status(200).send({ article })
  );
};
