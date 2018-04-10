const router = require('express-promise-router')();

const { isAuthenticated } = require('../helpers/permissions');
const controller = require('../controllers/messagesController');
const sockController = require('../controllers/messagesSockController');

router.get('/', controller.find);
router.post('/', isAuthenticated, controller.create);

router.get('/:id', controller.get);
router.ws('/stream', sockController.stream);

  module.exports = router;
