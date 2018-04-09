const Message = require('../models/message');
const Bot = require('../models/bot');
const { ParseError, HTTP404 } = require('../helpers/exceptions');
const { parseMongoError } = require("../helpers/validation");
const {toMongoObjectId} = require("../helpers/utils");


/**
 *  /posts/           find, create
 *  /posts/:id        get, update, patch, delete
 *  /posts/anything   any other rpc like actions
 */

function find(req, res) {
  return Message.find()
    .then(messages => {
      res.json(messages)
    });
}

async function create(req, res) {
  const {
    username, message: _message, type, locationName, world, tile, client_id,
  } = req.body;
  const bot = await Bot.findOne({client_id}).exec();
  const message = new Message({
    bot,
    username,
    message: _message,
    type,
    tile,
    locationName,
    world,
  });
  return message.save()
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new ParseError(parseMongoError(error));
    });
}

function get(req, res) {
  const id = toMongoObjectId(req.params.id);
  if (!id) {
    throw new HTTP404(`message ${req.params.id} not found`);
  }
  return Message.findOne({'_id': id})
    .then(message => {
      if (message) {
        res.json(message);
      } else {
        throw new HTTP404(`message ${req.params.id} not found`);
      }
    });
}

module.exports = {
  find,
  create,
  get,
};
