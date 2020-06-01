var createError = require('http-errors');
var express = require('express')


var socket_io = require('socket.io');
var app = express();

var io = socket_io();
app.io = io;



const publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

const Player = require('./lib/player.js');	
const Field = require('./public/javascripts/Field.js');


var socketList = [];
var playerList = [];

//BoardSize
const xSize = 9;
const ySize = 9;
//Starting field location
const startPos = {
    x:4,
    y:8
};
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
        for(y = 0;y <ySize;y++) {
            socket.player.fieldArray[x].push(new Field(x, y, 52));
            //Give a player ownership of their starting field
            if (x === startPos.x && y === startPos.y) {
                socket.player.fieldArray[x][y].buildable = true;
            }
        }
    }
    //Send the board state to the client
    sendFieldData(socket);
  //Event Handlers
    socket.on('moveUnit',function(e){
        //If a unit is moved on top of another unit, invalidate the move
        socket.player.unitList.forEach(function(unit){
            if(unit.x === e.newX && unit.y === e.newY){
                socket.emit('invalidateMove',{
                    unit: e.unit,
                    x: e.oldX,
                    y: e.oldY
                });
                console.log("Player " + e.playerID + " has tried to move a unit from: X: " + e.oldX + " Y: " + e.oldY + " to: X:" + e.newX + ' Y: ' + e.newY + " but couldn't!")
            }
        })
        //If unit is moved on a field you do not own or out of bounds, invalidate the move
        if(e.newX >= xSize || e.newX < 0 || e.newY >= ySize || e.newY < 0|| socket.player.fieldArray[e.newX][e.newY].buildable === false){
            socket.emit('invalidateMove',{
                unit: e.unit,
                x: e.oldX,
                y: e.oldY
            })
            console.log("Player " + e.playerID + " has tried to move a unit from: X: " + e.oldX + " Y: " + e.oldY + " to: X:" + e.newX + ' Y: ' + e.newY + " but couldn't!")
        } else {
            console.log("Player " + e.playerID + " has moved a unit from: X: " + e.oldX + " Y: " + e.oldY + " to: X:" + e.newX + ' Y: ' + e.newY);
            //Change the position server wise as well
            socket.player.unitList.forEach(function(unit){
                if(unit.x === e.oldX && unit.y === e.oldY){
                    unit.x = e.newX;
                    unit.y = e.newY;
                }
            })
        }
    });
    //Happens whenever a player buys a unit
    socket.on('buyUnit',function(e){
        playerList.forEach(function(element){
            if(element.id === e.playerID){
                element.player.unitList.push(e.unit);
                console.log(element.player.unitList);
            }
        })
        console.log(e);
    })
    socket.on('sellUnit',function(e){

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

function sendFieldData(socket){
            socket.emit('getBoardData',socket.player.fieldArray)
    console.log("Sent field data to player: " + socket.id);
}
module.exports = app;