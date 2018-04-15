const fs = require('fs');
const mongoose = require('mongoose');

const Message = require('../src/models/message');

mongoose.connect('mongodb://localhost/rs-chat-logger');

const WORDS = ['nice', 'buying', 'burnt', 'doubling', 'enj0y'];

/**
 * Finds all the dates when a word was used
 * @param searchwords - an array of words to search for
 * @returns {Promise<Object>} - resolves with a object of {word: [dates]}
 */
function wordDates(searchWords) {
  const wordDates = {};
  return Message.find()
  // .limit(30000)
  .then(messages => {
    for (const msg of messages) {
      for (let word of msg.message.split(' ')) {
        word = word.toLowerCase().trim();
        if (searchWords.includes(word)) {
          if (!wordDates[word]){
            wordDates[word] = [];
          }
          wordDates[word].push(msg.created_at);
        }
      }
    }
    return Promise.resolve(wordDates);
  })
  .catch(error => {
    console.log('error:', error);
  });
}

function binDates(dates, min, max, interval=(60*60*1000)) {
  const bins = [];
  let nextInterval = Number(min);
  let dateIndex = 0;
  while (min < max && nextInterval < max && dateIndex < dates.length) {
    nextInterval += interval;
    let count = 0;
    while (dateIndex < dates.length && dates[dateIndex] < nextInterval) {
      dateIndex++;
      count++;
    }
    bins.push(count);
  }
  return bins;
}

function minMaxDate(wordDates) {
  const allDates = [];
  Object.keys(wordDates).forEach(key => {
    allDates.push(...wordDates[key]);
  });
  const min = new Date(Math.min(...allDates));
  const max = new Date(Math.max(...allDates));
  return { min, max };
}

function generateDates(min, max, interval=60*60*1000) {
  const dates = [new Date(min)];
  let nextInterval = Number(min) + interval;
  while (min < max && nextInterval < max) {
    dates.push(new Date(nextInterval));
    nextInterval += interval;
  }
  return dates;
}

wordDates(WORDS)
  .then(wordDates => {
    const { min, max } = minMaxDate(wordDates);

    const data = {
      labels: generateDates(min, max),
      words: {},
    };
    Object.keys(wordDates).forEach(word => {
      data.words[word] = binDates(wordDates[word], min, max);
    });

    fs.writeFile('../resources/word_counts_over_time.json', JSON.stringify(data), 'utf8', (error) => {
       if (error) {
         console.log(error);
       }
      console.log('done writing to file')
    });
  })
  .catch(error => {
    console.log(error);
  });

