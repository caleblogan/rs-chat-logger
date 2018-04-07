const User = require('../models/user');

const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;


const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'superdupersecretman'; //TODO: put in env or config file

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  return User.findOne({ username: jwt_payload.username })
    .then(user => {
      if (user) {
        const userSafe = { username: user.username }
        next(null, userSafe);
      } else {
        next(null, false);
      }
    })
    .catch(error => {
      next(error, false);
    })
});

passport.use(strategy);

const auth = (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        user = {username: 'anon'}
      }
      req.user = user
      next()
    }
  )(req, res, next);
}


module.exports = {
  auth
}
