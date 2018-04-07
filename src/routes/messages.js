const router = require('express-promise-router')();

const controller = require('../controllers/messagesController');

router.get('/', controller.find);
router.post('/', controller.create);

router.get('/:id', controller.get);


module.exports = router;
