const router = require('express-promise-router')();

const controller = require('../controllers/usersController')

router.get('/', controller.find)
router.post('/', controller.create)

router.get('/:username', controller.get)


module.exports = router
