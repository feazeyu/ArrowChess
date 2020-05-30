var createError = require('http-errors');
var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

var socketList = [];
var playerList = [];

//BoardSize
var xSize = 9;
var ySize = 9;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Port on which the web is listening
const port = 3000;
//Start the server, listens on the chosen port
http.listen(port, ()=>{
  console.log('Server is running on port:' + port)
})
//Public images folder
app.get('/public/images/*',function (req,res) {
    res.sendFile(req.url);
})
//Do stuf when recieving a get request on the root
app.get('/', function(request, response){
  //Send the client the homepage
  response.sendFile('index.html', {root:__dirname});
});
//Trigger on client connection
io.on('connect',function(socket){
  //Store client resources, level and health
  socket.level = 1;
  socket.hp = 10;
  socket.gold = 1;
  //Generate an empty client board state
    for(x = 0;x<xSize;x++){
        socket.fieldArray.push([]);
        for(y = 0;y <ySize;y++){
            socket.fieldArray[x].push(0);
        }
    }
  //store client data for reference
  socketList.push(socket);
  //Find the client who disconnected and removes them from the client list on disconnect
  socket.on('disconnect',function(){
      socketList.forEach(function(element){
        if(element.id === socket.id){
          if(socketList.indexOf(element) !== -1){socketList.splice(socketList.indexOf(element),1)};
        }
      }
      )
  });
})

//TODO Send shop state
function randomizeShops(){
clientList.forEach(function(element){})
}



