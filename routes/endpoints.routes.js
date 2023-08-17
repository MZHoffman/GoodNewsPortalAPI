const express = require('express');
const { getAPIDescription } = require('../controllers/endpoits.controller');

const router = express.Router();

router.get('', getAPIDescription);

module.exports = router;
