var https = require('https');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./models');
var axios = require('axios');

app.use(express.static(path.resolve(__dirname, '../frontend/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/jokes', function(req, res){
  db.Joke.find()
    .then(function(jokes){
      res.json(jokes);
    })
    .catch(function(err){
      res.send(err);
    })
})

setInterval(function() {
  https.get("https://joke-list.herokuapp.com/", res => {
    console.log(res.statusCode);
  });
}, 1799999); // ping the website every 30 minutes to wake heroku

function seedDb() {
  var header = { headers: { "Accept": "application/json"} }

  for (var page = 1; page <= 18; page += 1) {
    axios.get(`https://icanhazdadjoke.com/search?limit=30&page=${page}`, header)
      .then(res => {
        var jokes = res.data.results;

        for (var i = 0; i < jokes.length; i += 1) {
          console.log('res...', res.data.results[i].joke);
          db.Joke.create({text: res.data.results[i].joke})
            .then(res => {
              console.log('joke successfully written to db');
            })
            .catch(err => {
              console.log('err creating joke in db...', err);
            });
        }
      })
      .catch(err => {
        console.log('err accessing joke api...', err);
      });
  }
};

// seedDb() // copy all possible jokes to local db, only needs to be done once

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
})

