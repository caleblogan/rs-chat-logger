const Message = require('../models/message');
const Bot = require('../models/bot');
const { ParseError, HTTP404 } = require('../helpers/exceptions');
const { parseMongoError } = require("../helpers/validation");
const { toMongoObjectId } = require("../helpers/utils");

function find(req, res) {
  let { offset, limit, sort='created_at', sort_order='asc', q } = req.query;
  const textQuery = q ? {$text: {$search: q}} : {};
  return Message
    .find(textQuery)
    .skip(Number(offset))
    .limit(Number(limit))
    .sort({
      [sort]: sort_order.toLowerCase() === 'asc' ? 1 : -1
    })
    .then(messages => {
      res.json(messages)
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

function messages(req, res) {
  const { username } = req.params;
  let { offset, limit, sort='created_at', sort_order='asc', q } = req.query;
  const textQuery = q ? {$text: {$search: q}, username} : {username};
  return Message
    .find(textQuery)
    .skip(Number(offset))
    .limit(Number(limit))
    .sort({
      [sort]: sort_order.toLowerCase() === 'asc' ? 1 : -1
    })
    .then(messages => {
      if (messages) {
        res.json(messages);
      } else {
        throw new HTTP404(`no messages for ${username} found`);
      }
    });
}

module.exports = {
  messages,
};
