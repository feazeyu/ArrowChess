//A declaration of a general unit
class Unit{

    /*
        Encoded parameters of units
        each unit has [maxHP, atk, default_dirs]
        directions are encoded as [dir1, dir2, ...]
        where dir is:
        0 = up
        1 = right
        2 = down
        3 = left
     */
    static setOfFlags = [

        //tier 0
        [
            /*
            type 0

            A basic one-directional unit
             */
            [3, 1, [0]]
        ],

        //tier 1
        [
            /*
            type 0

            A stronger one-directional unit
            */
            [3, 2, [0]],

            /*
            type 1

            A basic two-directional unit
             */
            [3, 1, [0,2]],

            /*
            type 2

            A basic two-directional unit
             */
            [3, 1, [0,1]],

            /*
            type 3

            A basic wall unit
             */
            [10, 0, []]

        ],
    ];

    /*
    traits:
    0 none
    1 green = healer
    2 red = double atk
    3 blue = transferee
    4 g + r += also heals itself per shoot
    5 g + b += also shields
    6 r + b += also instant
     */

    constructor(tier, type, direction, trait, x, y, player){
        this.tier = tier;
        this.type = type;
        this.direction = direction;
        this.trait = trait;
        this.x = x;
        this.y = y;
        this.maxhp = Unit.setOfFlags[tier][type][0];
        this.hp = this.maxhp;
        this.shield = 0;
        this.atk = Unit.setOfFlags[tier][type][1];
        this.dirs = Unit.setOfFlags[tier][type][2];
        this.player = player;
        this.draw();
        //Used for the drag and drop stuff;
        this.dragged = false;
        //Everything that has the draw() method should be pushed into drawArray
        for(let x in this.dirs) {
            x = (x + this.direction) % 4;
        }
    }

    /*
    At the start of the round every unit should shoot(playerArray)
    */
    shoot(arrayToPlace){
        for(let dir in this.dirs) {
            switch (this.trait) {
                case 0:
                    arrayToPlace.push(new Projectile(this.x, this.y, dir, 50, this.atk, 0, this.player));
                    break;
                case 1:
                    arrayToPlace.push(new Projectile(this.x, this.y, dir, 50, this.atk, 1, this.player));
                    break;
                case 2:
                    arrayToPlace.push(new Projectile(this.x, this.y, dir, 50, this.atk*2, 0, this.player));
                    break;
                case 3:
                    arrayToPlace.push(new Projectile(this.x, this.y, dir, 50, this.atk, 3, this.player));
                    break;
                case 4:
                    arrayToPlace.push(new Projectile(this.x, this.y, dir, 50, this.atk*2, 1, this.player));
                    this.hp += this.atk;
                    if(this.hp > this.maxhp){
                        this.hp = this.maxhp;
                    }
                    break;
                case 5:
                    arrayToPlace.push(new Projectile(this.x, this.y, dir, 50, this.atk, 5, this.player));
                    break;
                case 6:
                    arrayToPlace.push(new Projectile(this.x, this.y, dir, 50, this.atk*2, 6, this.player));
                    break;
                default:
                    throw "Unexpected trait: " + this.trait;
            }
        }
    }

    draw() {
        if(this.dragged !== true) {
            c.beginPath();
            c.strokeStyle = "#FFFFFF";
            c.lineWidth = 5
            c.moveTo(this.x * 52 + 26, this.y * 52 + 43);
            c.lineTo(this.x * 52 + 26, this.y * 52 + 10);
            c.moveTo(this.x * 52 + 16, this.y * 52 + 20)
            c.lineTo(this.x * 52 + 27, this.y * 52 + 9)
            c.moveTo(this.x * 52 + 36, this.y * 52 + 20)
            c.lineTo(this.x * 52 + 25, this.y * 52 + 9)
            c.stroke();
        } else {this.dragDraw()}
    }
    //draw while the unit is being dragged.
    dragDraw(){
        c.beginPath();
        c.strokeStyle = "#FFFFFF";
        c.lineWidth = 5
        c.moveTo(mouse.x+26-fieldSize/2,mouse.y+40-fieldSize/2);
        c.lineTo(mouse.x+26-fieldSize/2,mouse.y+10-fieldSize/2);
        c.moveTo(mouse.x+16-fieldSize/2,mouse.y+20-fieldSize/2);
        c.lineTo(mouse.x+27-fieldSize/2,mouse.y+9-fieldSize/2);
        c.moveTo(mouse.x+36-fieldSize/2,mouse.y+20-fieldSize/2);
        c.lineTo(mouse.x+25-fieldSize/2,mouse.y+9-fieldSize/2);
        c.stroke();
    }


}
