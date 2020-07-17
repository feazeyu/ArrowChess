/*
    This class should handle all the logic behind a two player/player vs NPC fights
 */
var app = require('../../app.js');
class Fight{
    constructor(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
    this.index = app.fightList.length - 1;
    }

    update(){
        player1.units.forEach((unit)=>{
            //Dostuff
            //TODO Updates in fights
        })
    }
    endFight(){
        fightList.splice(this.index, 1);
    }
}
try {
    module.exports = Fight;
} catch(e){}