const { HTTPError, HTTP404, ParseError } = require('./exceptions');

class Clients {
  constructor() {
    this.clients = {};
  }

  addClient(path, client) {
    if (!this.clients[path]) {
      this.clients[path] = {}
    }
    this.clients[path][client.id] = client;
  }

  removeClient(path, client) {
    if (!this.clients[path]) {
      console.log(`path ${path} doens't exist in clients`);
      return undefined;
    }
    delete this.clients[path][client.id];
  }

  broadcast(path, data) {
    if (!this.clients[path]) {
      return undefined;
    }
    Object.keys(this.clients[path]).forEach(clientID => {
      this.clients[path][clientID].send(JSON.stringify(data));
    });
  }
}

const middleware = () => {
  const wsClients = new Clients();
  return (req, res, next) => {
    req.wsClients = wsClients;
    next()
  };
};

module.exports = middleware;
