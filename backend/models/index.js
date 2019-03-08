var mongoose = require('mongoose');
mongoose.set('debug', true);
var Joke = require("./joke");

if (process.env.MONGO_URIDB) {
  console.log('connecting to MONGODB_URI..');
  mongoose.connect(process.env.MONGODB_URI);
} else {
  console.log('connecting to localhost/joke-app...');
  mongoose.connect('mongodb://localhost/joke-app');
}

mongoose.Promise = Promise;

module.exports = {
  Joke,
}

