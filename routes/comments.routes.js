const express = require('express');
const { removeComment } = require('../controllers/comments.controller');

const router = express.Router();
router.delete('/:comment_id', removeComment);

module.exports = router;
