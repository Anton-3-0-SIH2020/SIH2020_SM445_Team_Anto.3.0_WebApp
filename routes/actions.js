const express = require('express');

const actionController = require('../controllers/actions');

const router = express.Router();

router.get('/bse', actionController.getActionsBse);

router.get('/nse', actionController.getActionsNse);

router.get('/mc', actionController.getActionsMc);

module.exports = router;