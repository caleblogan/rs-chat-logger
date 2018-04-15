const fs = require('fs');
const sw = require('stopword');
const mongoose = require('mongoose');

const Message = require('../src/models/message');

mongoose.connect('mongodb://localhost/rs-chat-logger');

function wordCounts() {
  const counts = {};
  return Message.find()
  // .limit(10000)
  .then(messages => {
    for (const msg of messages) {
      for (let word of msg.message.split(' ')) {
        word = word.toLowerCase().trim();
        if (!counts[word]){
          counts[word] = 0;
        }
        counts[word] += 1;
      }
    }
    return Promise.resolve(counts);
  })
  .catch(error => {
    console.log('error:', error);
  });
}

function countsToArray(countDict) {
  const resCounts = [];
  for (const key of Object.keys(countDict)) {
    if (key.length < 2) {
      continue;
    }
    resCounts.push([countDict[key], key]);
  }
  return resCounts;
}

function removeStopWords(countsDict) {
  delete countsDict[''];
  const result = {};
  for (const word of sw.removeStopwords(Object.keys(countsDict))) {
    result[word] = countsDict[word];
  }
  return result;
}

wordCounts()
  .then(counts => {
    const withoutStopWords = removeStopWords(counts);
    const countsArray = countsToArray(withoutStopWords).sort((a, b) => b[0] - a[0]).slice(0, 100);
    // console.log(countsArray.sort((a, b) => b[0] - a[0]).slice(0, 100));
    fs.writeFile('../resources/word_counts.json', JSON.stringify(countsArray), 'utf8', (error) => {
       if (error) {
         console.log(error);
       }
      console.log('done writing to file')
    });
  })
  .catch(error => {
    console.log(error);
  });

