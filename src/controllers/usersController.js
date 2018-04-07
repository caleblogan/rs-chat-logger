const User = require('../models/user');

const { HTTP404 } = require('../helpers/exceptions');


/**
 *  /posts/           find, create
 *  /posts/:id        get, update, patch, delete
 *  /posts/anything   any other rpc like actions
 */

function find(req, res) {
  return User.find()
    .select('_id username')
    .then(users => {
      res.json(users)
    });
}

function get(req, res, next) {
  return User.findOne({'username': req.params.username}, '_id username')
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        next(new HTTP404(`user ${req.params.username} not found`));
      }
    })
}

module.exports = {
  find,
  get,
};
