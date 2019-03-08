var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./models/joke');
var axios = require('axios');

app.use(express.static(path.resolve(__dirname, '../frontend/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/jokes', function(req, res){
  db.Jokes.find()
    .then(function(jokes){
      res.json(jokes);
    })
    .catch(function(err){
      res.send(err);
    })
})

var header = { headers: { "Accept": "application/json"} }

const seedDb = () => {
  axios.get('https://icanhazdadjoke.com/search?limit=30&page=2', header)
    .then(res => {
      console.log('res...', res.data);
    }).catch(err => {
      console.log('err...', err);
    });
};

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + port);
})

