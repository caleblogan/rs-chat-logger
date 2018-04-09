const router = require('express-promise-router')();
const { isAuthenticated } = require('../helpers/permissions');

const controller = require('../controllers/botsController');

router.get('/', controller.find);
router.post('/', isAuthenticated, controller.create);

router.get('/:client_id', isAuthenticated, controller.get);
router.post('/:client_id/checkin', isAuthenticated, controller.checkin);


module.exports = router;
