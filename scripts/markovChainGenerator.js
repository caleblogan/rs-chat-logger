const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const mongoose = require('mongoose');
const _ = require('lodash');

const Message = require('../src/models/message');

mongoose.connect('mongodb://localhost/rs-chat-logger');

function messageList() {
  return Message.find()
  // .limit(30000)
  .then(messages => {
    return messages
      .map(msg => msg.message)
      .filter(msg => (
        !msg.includes('enj0y') &&
        !msg.includes('go0^g1e') &&
        !msg.match(/[><\]\[\^]/)
      ));
  })
  .catch(error => {
    console.log('error:', error);
  });
}

function nGrams(message, n, model) {
  for (let i = 0; i < message.length - n; ++i) {
    const gram = message.substr(i, n);
    if (!model[gram]) {
      model[gram] = [];
    }
    model[gram].push(message[i+n])
  }
  return model;
}

async function buildModel(n=3) {
  const messagesText = await messageList();

  const model = {};
  for (const message of messagesText) {
    nGrams(message, n, model);
  }
  return { model, messagesText };
}

function generateMessage(model, start, maxLength=100) {
  let n = start.length;
  let message = start;

  for (let i = 0; i < maxLength; ++i) {
    let currentGram = message.substr(i, n);
    if (!model[currentGram]) {
      break;
    }
    message += _.sample(model[currentGram]);
  }
  return message;
}

function getRandomStart(messagesText, n) {
  return _.sample(messagesText).substr(0, n);
}

function saveModel(data) {
  return writeFileAsync('../resources/markov_model.json', JSON.stringify(data),'utf-8')
    .then(data => {
      console.log('done writing model');
      return data;
    })
    .catch(error => {
      console.log(error);
    })
}

function loadModel() {
  return readFileAsync('resources/markov_model.json', 'utf-8')
    .then(data => {
      return JSON.parse(data);
    })
    .catch(error => {
      console.log(error);
    })
}

async function run() {
  saveModel(await buildModel(3));

  // const { model, messagesText } = await loadModel();
  // const start = getRandomStart(messagesText, 3);
  // console.log('start', start);
  // const message = generateMessage(model, start);
  // console.log('generated:', message);
}

module.exports = async function() {
  const { model, messagesText } = await loadModel();
  const start = getRandomStart(messagesText, 3);
  console.log('start', start);
  return message = generateMessage(model, start);
}


// run();
