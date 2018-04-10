const uuid = require('uuid');

const Message = require('../models/message');
const Bot = require('../models/bot');
const { ParseError, HTTP404 } = require('../helpers/exceptions');
const { parseMongoError } = require("../helpers/validation");
const {toMongoObjectId} = require("../helpers/utils");



function stream(ws, req) {
  console.log('connected');
  ws.id = uuid.v4();
  req.wsClients.addClient('/stream', ws);

  ws.on('message', function(msg) {
    ws.send(msg);
  });

  ws.on('close', function close() {
    req.wsClients.removeClient('/stream', ws);
    console.log('disconnected');
  });
}


// setInterval(() => {
//   const message = {
//     _id: uuid.v4(),
//     "bot": "5acb97aa2f1aec9eb1633cf0",
//     "username": "FarLye06090",
//     "message": "[Farlye06090] [50k] - [11350k] [54 - 100] Good luck |16:40:26|",
//     "type": "PLAYER",
//     "tile": "3162 3483 0",
//     "locationName": "Varrock Ge",
//     "world": 301,
//     "created_at": "2018-04-09T16:41:15.549Z",
//   };
//   broadcast('/stream', message);
// }, 2000);


module.exports = {
  stream,
};
