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

function seedDb() {
  var header = { headers: { "Accept": "application/json"} }

  axios.get('https://icanhazdadjoke.com/search?limit=30&page=2', header)
    .then(res => {
      console.log('res...', res.data.results[1].joke);
      db.Joke.create({text: res.data.results[1].joke})
        .then(res => {
          console.log('joke successfully written to db');
        })
        .catch(err => {
          console.log('err creating joke in db...', err);
        });
    })
    .catch(err => {
      console.log('err accessing joke api...', err);
    });
};

// seedDb()

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
})

