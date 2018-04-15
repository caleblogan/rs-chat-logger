const { promisify } = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const { ParseError, HTTP404, ServerError } = require('../helpers/exceptions');
const { parseMongoError } = require("../helpers/validation");
const {toMongoObjectId} = require("../helpers/utils");

function wordcounts(req, res) {
  return readFileAsync('./resources/word_counts.json', 'utf-8')
    .then(counts => {
      res.json(JSON.parse(counts));
    })
    .catch(error => {
      console.log(error);
      throw new ServerError('Error loading word counts')
    })
}

function wordcountsOverTime(req, res) {
  return readFileAsync('./resources/word_counts_over_time.json', 'utf-8')
    .then(data => {
      res.json(JSON.parse(data));
    })
    .catch(error => {
      console.log(error);
      throw new ServerError('Error loading word counts over time')
    })
}

module.exports = {
  wordcounts,
  wordcountsOverTime,
};
