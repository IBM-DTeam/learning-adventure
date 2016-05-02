var express = require('express');
var port = 8000;

//initialise app on using express
var app = express();

// A function to respond to the requests
app.get('/',function(req,res){
  res.send("We got a hit! YAY it works")
})

//lets make the server listen on the port
app.listen(port, function(){
  console.log("listening on localhost:"+port)
})
