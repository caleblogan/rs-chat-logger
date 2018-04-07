const router = require('express-promise-router')();
const { isAuthenticated } = require('../helpers/permissions');

const controller = require('../controllers/messagesController');

router.get('/', controller.find);
router.post('/', isAuthenticated, controller.create);

router.get('/:id', controller.get);


module.exports = router;
