const mongoose = require('mongoose')

function parseMongoError(error) {
  if (error.errors) {
    return error.errors
  } else {
    return error
  }
}

module.exports = {
  parseMongoError,
}