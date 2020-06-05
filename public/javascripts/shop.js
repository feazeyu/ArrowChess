/*
<p>An implementation of a player's shop</p>

<p>Should implement:</p>
<p>- constructor</p>
<p>- refresh() (and its mechanics, such as randomization)</p>
<p>- buy(Unit)</p>

 */
class Shop{
    /*
    <p>A shared pool of units</p>
    <p>sharedPool[i] contains an array of unit types of tier (i-1)</p>
    <p>sharedPool[0] contains an array of trait indexes</p>

     */
    static sharedPool = [];

    /*
    parameters for pool generation
     */
    static unitCount = [300, 150, 50];

    /*
    parameters for pool generation
     */
    static traitCount = 60;

    /*
    chances of getting [traitUnit, trait, tier 0, tier 1, ...] where the probabilities saved in probabilities[level] refer to level of shop
     */
    static probabilities = [
        [0.01, 0.00, 1.00, 0.00, 0.00],
        [0.05, 0.00, 0.85, 0.15, 0.00],
        [0.10, 0.01, 0.60, 0.30, 0.09],
        [0.15, 0.05, 0.35, 0.35, 0.25],
    ];

    /*
    <p>Should generate shared pool (should be called only once)</p>
    <p>First clears the pool and then adds units (same chance for each unit)</p>
    <p>For each tier only generates list of types, NOT INSTANCES</p>
    */
    static generatePool(){
        Shop.sharedPool[0] = [];
        for(let j = 0; j < Shop.traitCount; j++) {
            let random = Math.ceil(Math.random() * 3);
            Shop.sharedPool[0].push(random);
        }
        for(let i = 1; i < Shop.unitCount.length+1; i++){
            Shop.sharedPool[i] = [];
            for(let j = 0; j < Shop.unitCount[i-1]; j++){
                let random = Math.floor(Math.random() * Unit.unitCount[i-1]);
                Shop.sharedPool[i].push(random);
            }
        }
    }

    constructor(player) {
        this.level = 1;
        this.size = 3;
        this.offer = [];
        this.isFrozen = false;
        this.player = player;
        this.refreshShop();
    }


    /*
    <p>This method returns a randomized unit from a tier (type: Unit)</p>
    <p>Calling extractUnitFromPool(-1) returns a random trait (type: number)</p>
     */
    extractRandomUnitFromPool(tier){

        if(Shop.sharedPool[tier+1].length === 0){
            throw new Error("Shop.sharedPool[" + (tier+1) + "] is empty, couldn't select a random element");
        }

        //generate random index
        let randomIndex = Math.floor(Math.random()*Shop.sharedPool[tier+1].length);

        //swap random index and last element
        let temp = Shop.sharedPool[tier+1][Shop.sharedPool.length-1];
        Shop.sharedPool[tier+1][Shop.sharedPool.length-1] = Shop.sharedPool[tier+1][randomIndex];
        Shop.sharedPool[tier+1][randomIndex] = temp;

        //pop the random element
        let type = Shop.sharedPool.pop();

        //if desired extract is trait, return it. Otherwise generate a random unit
        if(tier === -1){
            return type;
        }

        //generate random direction
        let randomDirection = Math.floor(Math.random()*4);

        //roll for trait
        let traitRoll = Math.random();
        let trait = 0;
        if(traitRoll < Shop.probabilities[this.level][0]){
            trait = this.extractRandomUnitFromPool(-1);
        }

        return new Unit(tier, type, randomDirection, trait, 0, 0, this.player);
    }

    /*
    This method rolls for a unit from a shop (removes it from shared pool) and returns it
     */
    rollForUnit(){
        //random roll
        let roll = Math.random();

        //determine tier of a rolled unit based on roll
        let tier = -1;
        while(roll > Shop.probabilities[this.level][tier+2]){
            roll -= Shop.probabilities[this.level][tier+2];
            tier++;
        }

        //extract a random unit of the tier and return it
        return this.extractRandomUnitFromPool(tier);

    }

    /*
    this method adds unit back to shared pool
     */
    static scrap(unit){
        if(unit.trait !== 0){
            Shop.sharedPool[0].push(unit.trait);
        }
        Shop.sharedPool[unit.tier+1].push(unit.type);
    }

    /*
    <p>This method should:</p>
    <p> - pop all units from shop and push them back into the shared pool</p>
    <p> - roll for units until the shop is full again </p>
     */
    refreshShop(){
        while(this.offer.length >0){
            let unit = this.offer.pop();
            Shop.scrap(unit);
        }

        while(this.offer.length < this.size){
            let unit = this.rollForUnit();
            this.offer.push(unit);
        }
    }

    /*
    Returns unit if it can be bought otherwise throws error
     */
    buy(unit){
        if(this.offer.indexOf(unit) !== undefined){
            Shop.scrap(unit);
            return unit;
        } else {
            throw new Error("Cannot find such unit in shop");
        }
    }

    //Toggles freeze
    toggleFreeze(){
        this.isFrozen = !this.isFrozen;
    }

    /*
    <p>Handles the new round event:</p>
    <p> - if frozen then unfreeze</p>
    <p> - if not then refresh</p>
     */
    newRound(){
        if(this.isFrozen){
            this.toggleFreeze();
        } else {
            this.refreshShop();
        }
    }
}