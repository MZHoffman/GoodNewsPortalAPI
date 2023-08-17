const express = require('express');
const {
  getArticles,
  getArticle,
  patchArticle,
} = require('../controllers/articles.controller');

const router = express.Router();

router.get('/:article_id', getArticle);
router.get('', getArticles);
router.patch('/:article_id', patchArticle);

module.exports = router;
