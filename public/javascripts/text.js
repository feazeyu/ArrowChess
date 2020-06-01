class Text{
    constructor(value, x, y, size, color, align) {
        this.value = value || 'Value not set';
        this.x = x || 234;
        this.y = y || 234;
        this.size = size || 10;
        this.color = color || '#FFFFFF';
        this.align = align || 'center';
        this.draw();
    }
    draw(){
        c.fillStyle = this.color;
        c.font = this.size + "px Arial";
        c.textAlign = this.align;
        c.fillText(this.value, this.x, this.y);
    }
}