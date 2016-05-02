var http = require('http');
var port = 8000

//function to handle requests
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}
//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(port, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:"+ port);
});
