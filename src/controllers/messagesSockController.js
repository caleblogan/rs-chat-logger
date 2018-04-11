const uuid = require('uuid');

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

module.exports = {
  stream,
};
