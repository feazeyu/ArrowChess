var Player = {
    constructor(socket) {
        this.id = socket.id
        this.socket = socket
        this.hp = 10
        this.gold = 0
        this.units = [];
        this.projectiles = [];
        this.shopItems=[];
        this.fieldArray = [];
        console.log("Player with the id " + this.id + " has connected");
    }

}

module.exports = Player;
