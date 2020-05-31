class Field{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.buildable = false;
        this.enemy = false;
        this.draw();
        this.units = [];
    }
    draw(){
        c.clearRect(this.x*this.size, this.y*this.size, this.size, this.size);
        if(this.enemy == true){
            c.strokeStyle = "#FF0000"
        } else if (this.buildable == false){
            c.strokeStyle = "#929090"
        } else {
            c.strokeStyle = "#FFFFFF"
        }
        c.beginPath();
        c.strokeRect(this.x*this.size, this.y*this.size, this.size, this.size);
        c.closePath();
    }
}