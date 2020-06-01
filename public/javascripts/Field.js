class Field{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.buildable = false;
        this.enemy = false;
        this.draw();
        this.units = [];
        try{
        } catch(e){}
    }
    draw() {
        //Try catch statement due to "c" not existing on the server side of things
        try{
        c.clearRect(this.x * this.size, this.y * this.size, this.size, this.size);
        c.lineWidth = 1;
        if (this.enemy === true) {
            c.strokeStyle = "#FF0000"
        } else if (this.buildable === false) {
            c.strokeStyle = "#929090"
        } else {
            c.strokeStyle = "#FFFFFF"
        }
        c.beginPath();
        c.strokeRect(this.x * this.size, this.y * this.size, this.size, this.size);
        c.closePath();
        } catch(e){

        }
    }
}
try {
    module.exports = Field;
} catch(e){}