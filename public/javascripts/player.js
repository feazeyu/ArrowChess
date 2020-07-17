/*
Class player should implement all information about player and his/her state in game
 */
class Player{

    constructor(hp) {
        this.hp = hp;
        this.gold = 0;
        this.units = [];
        this.projectiles = [];
        this.shop = new Shop();
    }
}
try{
modules.exports = Player;
}catch(e){

}