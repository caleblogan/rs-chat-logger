const express = require('express');
const router = express.Router();

const users = require('./users');
const messages = require('./messages');
const bots = require('./bots');
const accounts = require('./accounts');
const charts = require('./charts');
const markov = require('./markov');

function healthCheck(req, res) {
  res.json({'status': 'Everything is fine'})
}

router.get('/', healthCheck);
router.use('/users', users);
router.use('/messages', messages);
router.use('/bots', bots);
router.use('/accounts', accounts);
router.use('/charts', charts);
router.use('/markov', markov);


module.exports = router;
