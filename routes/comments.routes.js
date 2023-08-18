const express = require('express');
const {
  removeComment,
  patchComment,
} = require('../controllers/comments.controller');

const router = express.Router();
router.delete('/:comment_id', removeComment);
router.patch('/:comment_id', patchComment);

module.exports = router;
