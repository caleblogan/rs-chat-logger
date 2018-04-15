const router = require('express-promise-router')();

const { isAuthenticated } = require('../helpers/permissions');
const controller = require('../controllers/messagesController');
const markovGenerator = require('../../scripts/markovChainGenerator');

router.get('/', (req, res) => {
  return markovGenerator()
    .then(message => {
      res.json({ message })

    })
});

module.exports = router;
