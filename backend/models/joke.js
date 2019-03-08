var mongoose = require('mongoose');

var jokeSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});

var Joke = mongoose.model('Joke', jokeSchema, 'joke');

module.exports = Joke;
