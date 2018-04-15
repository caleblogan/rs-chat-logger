const router = require('express-promise-router')();

const { isAuthenticated } = require('../helpers/permissions');
const controller = require('../controllers/chartsController');

router.get('/word-counts', controller.wordcounts);
router.get('/word-counts-over-time', controller.wordcountsOverTime);

module.exports = router;
