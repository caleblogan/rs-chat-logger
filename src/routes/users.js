const router = require('express-promise-router')();

const controller = require('../controllers/usersController')

router.get('/', controller.find)

router.get('/:username', controller.get)


module.exports = router
