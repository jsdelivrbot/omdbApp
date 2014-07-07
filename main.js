var express = require("express");
var mongoose = require("mongoose");
var app = express();
var Search = require ('./models/search');
var bodyParser = require('body-parser');
app.use(bodyParser());

// DB CONFIG
var db = mongoose.connection; // http://mongoosejs.com/docs/api.html#connection_Connection

db.on('open', function(){
  console.log('Database connected');
});
db.on('error', function(error){
  console.log('Error in MongoDB connection', {error: error});
});

mongoose.connect('mongodb://admin:GAFTW@kahana.mongohq.com:10063/omdbapp', { server: { auto_reconnect: true, socketOptions: { keepAlive: 1} }});

// ROUTES

// main route 
app.get('/', function(req,res){
	res.render("index.jade")
});

// add the title to the DB for leaderboard
app.post("/add", function(req, res) {
    var search = {
      title: req.body.title,
    };
    var newSearch = new Search(search);
    newSearch.save(function(err) {
      if (err) {
        console.error('error saving search', err);
        res.send(500);
      }
      console.log("Saved "+ search.title + " to the DB");
    });
    return res.send(201);
  });

app.get('/leaderboard', function(req,res){
	// do the mongo query in here
	res.render("leaderboard.jade")
})

app.get('/leaders', function(req,res) {
		Search.find({}, function (err, searches) {
         // var searchMap = {};
         
         // searches.forEach(function(search) {
              // searchMap[search._id] = search;
         			res.send(searches);
          // }, 
          {};
    });
});

// 404 page
app.get('*', function (req, res) {
    res.send("Sorry - there's nothing here", 404);
});

// Get the server starting
var port = Number(process.env.PORT || 5000);
app.listen(port,function(){
	console.log("Let's get this party started.....on port " + port);
})