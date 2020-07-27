const express = require('express');

const searchController = require('../controllers/search');

const router = express.Router();

router.post('/search', searchController.postSearch);

router.get('/search', searchController.getSearch);

module.exports = router;