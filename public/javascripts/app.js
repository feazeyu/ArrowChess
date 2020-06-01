
    //Array to store all fields
    var fieldArray = [];
    //Begin a socket connection
    var socket = io();
    //Get the object of gamefield
    var canvas = document.getElementById("game");
    var c = canvas.getContext("2d");
    //Create the player on join.
    var player;
    socket.on('newPlayer',function(e){
    player = e;
    console.log(player);
    })
    //Populate the gamefield of size xSize * ySize, fields wil be the size of fieldSize * fieldSize
    function fieldInit(xSize,ySize, fieldSize){
        canvas.width = xSize * fieldSize;
        canvas.height = ySize * fieldSize;
        for(x = 0;x<xSize;x++){
            fieldArray.push([]);
            for(y = 0;y <ySize;y++){
                //Input field data here
                fieldArray[x].push(new Field(x, y, fieldSize));
            }
        }


        /*     Used for testing if click event works.
        test(){
            c.clearRect(this.x*this.size, this.y*this.size, this.size, this.size);
            c.beginPath();
            c.strokeStyle = "#FF0000";
            c.strokeRect(this.x*this.size, this.y*this.size, this.size, this.size);
            c.closePath();
        }
         */
    }
    //Call the init
    fieldInit(9,9,52);
    //Track the mouse position
    var mouse= {
        x: 0,
        y: 0
    }
    window.addEventListener('mousemove',function(e){
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener('click', function(e){
        console.log("X: " + mouse.x + " Y: " + mouse.y);
        //Calculate the field you clicked on
        let clickedOnX = Math.floor(mouse.x/52);
        let clickedOnY = Math.floor(mouse.y/52);
        //fieldArray[clickedOnX][clickedOnY].test(); //Used for debugging click calculation
    });

    function buyUnit(unit) {
        //TODO buying units
        if (player.money >= 2) {
            socket.emit('buyUnit', {
                unit: unit,
                playerID: socket.id
            });
        }
    }
    function moveUnit(unit,x ,y){
        socket.emit('moveUnit',{
            unit: unit,
            oldX: unit.x,
            oldY: unit.y,
            newX: x,
            newY: y,
            playerID: socket.id
        })
        unit.x = x;
        unit.y = y;
    }
    socket.on('playerInfo', function(e){
        console.log(e);
    })