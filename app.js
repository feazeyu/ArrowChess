var createError = require('http-errors');
var express = require('express')


var socket_io = require('socket.io');
var app = express();

var io = socket_io();
app.io = io;



var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

const Player = require('./lib/player.js');	


var socketList = [];
var playerList = [];

//BoardSize
var xSize = 9;
var ySize = 9;

//Public images folder
app.get('/public/javascripts/*',function (req,res) {
    res.sendFile(req.url,{root:__dirname});
})
//Do stuf when recieving a get request on the root
app.get('/', function(request, response){
  //Send the client the homepage
  response.sendFile('index.html', {root:__dirname});
});

//Trigger on client connection
io.on('connect',function(socket){
  //Store client resources, level and health
    socket.player={
        gold:0,
        hp:10,
        unitList:[],
        projectileList:[],
        shopItems:[],
        fieldArray:[],
        units:[]
    }
    playerList.push(socket);
    socket.emit('newPlayer',socket.player);
  //Generate an empty client board state
    for(x = 0;x<xSize;x++){
        socket.player.fieldArray.push([]);
        for(y = 0;y <ySize;y++){
            socket.player.fieldArray[x].push(0);
        }
    }
  //Event Handlers
    socket.on('moveUnit',function(e){
        console.log("Player "+e.playerID+" has moved a unit from: X: " +e.oldX+ " Y: " + e.oldY+ " to: X:" +e.newX+ ' Y: ' + e.newY );
    });
    socket.on('buyUnit',function(e){
        playerList.forEach(function(element){
            if(element.id == e.playerID){
                element.player.unitList.push(e.unit);
                console.log(element.player.unitList);
            }
        })
        console.log(e);
    })
    socket.on('sellUnit',function(e){

    })
    socket.on('moveUnit',function(e){

    })
  //Find the client who disconnected and removes them from the player list on disconnect
  socket.on('disconnect',function(){
      playerList.forEach(function(element){
        if(element.id === socket.id){
          if(playerList.indexOf(element) !== -1){playerList.splice(playerList.indexOf(element),1)};
        }
      }
      )
  });
})

//TODO Send shop state
function randomizeShops(){
	playerList.forEach(function(element){})
}


function sendPlayerInfo(playerID){
    playerList.forEach(function(element){
        if(element.id === playerID){
            io.emit('playerInfo', element.player);
        }
    })
}

module.exports = app;
