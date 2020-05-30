class Projectile{

    constructor(x, y, direction, lifeSpan, dmg, trait, player){
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.lifeSpan = lifeSpan;
        this.dmg =  dmg;
        this.trait = trait;
        this.player = player;
    }

    /*
    Should handle a change of projectile properties on-tick

    - change the position

    the interaction between projectiles and units should be handled somewhere else
     */
    move() {
        this.lifeSpan--;
        if (this.trait === 6) {
            //TODO: instant transmission
        } else {
            switch (this.direction) {
                case 0:
                    this.y--;
                    break;
                case 1:
                    this.x++;
                    break;
                case 2:
                    this.y++;
                    break;
                case 3:
                    this.x--;
                    break;
                default:
                    throw "Unexpected direction: " + this.direction;
            }
        }
    }
}