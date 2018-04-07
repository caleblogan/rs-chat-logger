/**
 * Used for creating permission middleware.
 */


function isAuthenticated(req, res, next) {
  if (req.user && req.user.username !== 'anon') {
    next()
  } else {
    res.status(401).send({'error': 'requires Authorization headers Token set'})
  }
}

function isUser(req, res, next) {
  if (req.user && req.user.username === req.params.username) {
    next()
  } else {
    res.status(401).send({'error': 'requires Authorization headers Token set'})
  }
}

module.exports = {
  isAuthenticated,
  isUser,
}
