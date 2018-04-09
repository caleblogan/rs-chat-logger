const Bot = require('../models/bot');
const User = require('../models/user');
const { ParseError, HTTP404 } = require('../helpers/exceptions');
const { parseMongoError } = require("../helpers/validation");
const { toMongoObjectId } = require("../helpers/utils");


/**
 *  /bots/           find, create
 *  /bots/:id        get, update, patch, delete
 *  /bots/anything   any other rpc like actions
 */

function find(req, res) {
  return Bot.find()
    .then(bots => {
      res.json(bots);
    });
}

async function create(req, res) {
  const { username } = req.user;
  const {
    client_id, world, description, location_name,
  } = req.body;
  const mac_addr = client_id.split(':')[0];
  const ip_addr = req.ip;
  const user = await User.findOne({username}).exec();
  const bot = new Bot({
    user,
    client_id,
    mac_addr,
    ip_addr,
    world,
    description,
    location_name,
  });
  return bot.save()
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      throw new ParseError(parseMongoError(error));
    });
}

async function get(req, res) {
  const user = await User.findOne({username: req.user.username}).exec();
  return Bot.findOne({'client_id': req.params.client_id, 'user': user})
    .populate('user', 'username')
    .then(bot => {
      if (bot) {
        res.json(bot);
      } else {
        throw new HTTP404(`bot ${req.params.client_id} not found`);
      }
    });
}

/**
 * Bots checkin handler. Creates a new bot if client_id doesn't exist.
 * Might be better to create a register endpoint and only use checkin for updating last_checkin.
 * @param req
 * @param res
 * @returns {Promise}
 */
async function checkin(req, res) {
  const user = await User.findOne({username: req.user.username}).exec();
  const { location_name, world } = req.body;
  return Bot.findOne({'client_id': req.params.client_id, 'user': user})
    .populate('user', 'username')
    .then(bot => {
      if (bot) {
        bot.last_checkin = new Date();
        bot.location_name = location_name;
        bot.world = world;
        bot.save();
        res.json(bot);
      } else {
        return create(req, res);
      }
    });
}

module.exports = {
  find,
  create,
  get,
  checkin,
};
