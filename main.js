var express = require("express");
var app = express();

app.get('/', function(req,res){
	res.render("index.jade")
});

var port = Number(process.env.PORT || 5000);
app.listen(port,function(){
	console.log("Let's get this party started.....on port " + port);
})