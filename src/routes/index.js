const express = require('express');
const router = express.Router();

const users = require('./users');
const messages = require('./messages');
const bots = require('./bots');
const accounts = require('./accounts');

function healthCheck(req, res) {
  res.json({'status': 'Everything is fine'})
}

router.get('/', healthCheck);
router.use('/users', users);
router.use('/messages', messages);
router.use('/bots', bots);
router.use('/accounts', accounts);

module.exports = router;
