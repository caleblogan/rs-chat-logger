const router = require('express-promise-router')();

const { isAuthenticated } = require('../helpers/permissions');
const controller = require('../controllers/accountsController');

router.get('/:username/messages', controller.messages);

module.exports = router;
