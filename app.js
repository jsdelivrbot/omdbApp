var express = require("express");
var mongoose = require("mongoose");
var app = express();
var Search = require ('./models/search');
var bodyParser = require('body-parser');
app.use(bodyParser());

// app.set('views', __dirname + '/views/');
app.use(express.static(__dirname, '/public'));
app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/js', express.static(__dirname + '/public/js'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade')



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
	res.render("index")
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

//render the leaderboard page
app.get('/leaderboard', function(req,res){
	res.render("leaderboard")
})

//display the results from mongo
app.get('/leaders', function(req,res) {
		Search.find({}, function (err, searches) {
         			res.send(searches);
          // }, 
          {};
    });
});

app.get('/remove', function(req,res) {
  Search.remove({}, function(err){
    if(err){
      console.log("Error deleted db " + err);
      res.send(500);
    }
  });
  console.log("The leaderboard is deleted!");
  res.send(200);
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