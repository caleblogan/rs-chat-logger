const { ObjectId } = require('mongoose/lib/types/objectid');

function wrapAsync(fn) {
  return function(req, res, next) {
    return fn(req, res, next)
      .catch(error => {
        next(new ServerError())
      })
  }
}

function toMongoObjectId(id) {
  try {
    return ObjectId(id);
  } catch (error) {
    return null;
  }
}

module.exports = {
  wrapAsync,
  toMongoObjectId,
}

