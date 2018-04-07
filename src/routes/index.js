const express = require('express');
const router = express.Router();

const users = require('./users');
const messages = require('./messages');

function healthCheck(req, res) {
  res.json({'status': 'Everything is fine'})
}

router.get('/', healthCheck);
router.use('/users', users);

router.use('/messages', messages);

module.exports = router;
