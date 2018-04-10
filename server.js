const express = require('express');
const app = express();
const expressWss = require('express-ws')(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const uuid = require('uuid');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rs-chat-logger');

const apiRoutes = require('./src/routes');
const { http404Handler, errorHandler } = require('./src/helpers/middleware');
const { auth } = require('./src/helpers/auth');


app.use(morgan('tiny'));

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(auth);

app.use('/api/v1', apiRoutes);

// Handle clients
const clients = {};
function broadcast(path, data) {
  if (!clients[path]) {
    return undefined;
  }
  Object.keys(clients[path]).forEach(clientID => {
    clients[path][clientID].send(JSON.stringify(data));
  });
}
function addClient(path, client) {
  if (!clients[path]) {
    clients[path] = {}
  }
  clients[path][client.id] = client;
}
function removeClient(path, client) {
  if (!clients[path]) {
    console.log(`path ${path} doens't exist in clients`);
    return undefined;
  }
  delete clients[path][client.id];
}

app.ws('/echo', function(ws, req) {
  console.log('connected');
  ws.id = uuid.v4();
  addClient('/echo', ws);

  ws.on('message', function(msg) {
    ws.send(msg);
  });

  ws.on('close', function close() {
    removeClient('/echo', ws);
    console.log('disconnected');
  });
});

setInterval(() => {
  const message = {
    _id: uuid.v4(),
    "bot": "5acb97aa2f1aec9eb1633cf0",
    "username": "FarLye06090",
    "message": "[Farlye06090] [50k] - [11350k] [54 - 100] Good luck |16:40:26|",
    "type": "PLAYER",
    "tile": "3162 3483 0",
    "locationName": "Varrock Ge",
    "world": 301,
    "created_at": "2018-04-09T16:41:15.549Z",
  };
  broadcast('/echo', message);
}, 2000);

app.use(http404Handler);

app.use(errorHandler);

app.listen(8000, () => console.log('Example app listening on port 8000!'));