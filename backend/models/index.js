var mongoose = require('mongoose');
mongoose.set('debug', true);
const Jokes = require("./joke");

if (process.env.MONGO_URI) {
  console.log('connecting to MONGO_URI..');
  mongoose.connect(process.env.MONGO_URI);
} else {
  console.log('connecting to localhost/joke-app...');
  mongoose.connect('mongodb://localhost/joke-app');
}

mongoose.Promise = Promise;

module.exports = {
  Jokes,
}

