const express = require('express');
const router = express.Router();

const users = require('./users');
const messages = require('./messages');
const bots = require('./bots');

function healthCheck(req, res) {
  res.json({'status': 'Everything is fine'})
}

router.get('/', healthCheck);
router.use('/users', users);
router.use('/messages', messages);
router.use('/bots', bots);

module.exports = router;
