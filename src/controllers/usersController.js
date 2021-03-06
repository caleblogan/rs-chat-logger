const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { HTTP404, ServerError } = require('../helpers/exceptions');


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

function create(req, res) {
  const { username, password } = req.body;
  const user = new User({
    username,
    password,
    api_token: jwt.sign({username}, 'superdupersecretman'), // TODO: put in env or config file
  });
  return user.save()
    .then(user => {
      res.json({ token: user.api_token });
      // res.json(req.body)
    })
    .catch(error => {
      throw new ServerError(error);
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
  create,
  get,
};
