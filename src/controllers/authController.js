const jwt = require('jsonwebtoken');


const User = require('../models/user');
const { ParseError, ServerError, AuthenticationFailed } = require('../helpers/exceptions');
const { parseMongoError } = require('../helpers/validation');


async function signup(req, res, next) {
  const { username, password } = req.body;
  const user = new User({
    username,
    password
  });
  user.save()
    .then(user => {
      return login(req, res, next)
    })
    .catch(error => {
      next(new ParseError(parseMongoError(error)))
    });
}

async function login(req, res, next) {
  const { username, password } = req.body;
  return User.findOne({username})
    .then(user => {
      if (user) {
        user.comparePassword(password, (error, isMatch) => {
          if (error) next(new AuthenticationFailed());

          if (isMatch) {
            // const token = jwt.sign({username}, 'superdupersecretman');
            // res.json({token});
            res.json({ token: user.api_token });
          }
        })
      } else {
        next(new AuthenticationFailed());
      }
    })
}

async function logout(req, res, next) {
  next(new ServerError('not implemented'));
}

module.exports = {
  signup,
  login,
  logout,
};

// ===== Token Shit ======

// const tokenHeader = req.headers['authorization']
// const token = tokenHeader.split(' ')[1]
// console.log('token:', token)
// const decoded = jwt.verify(token, 'superdupersecretman');
// return res.json({decoded})
