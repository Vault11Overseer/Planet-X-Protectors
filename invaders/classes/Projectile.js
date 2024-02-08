export // PROJECTILE CLASS
class Projectile {
    // CONSTRUCTOR
    constructor(){
        this.width = 3;
        this.height = 40;
        this.x = 0;
        this.y = 0;
        this.speed = 20;
        this.free = true;
    }

    // DRAW
    draw(context){
        if (!this.free){
            context.save();
            context.fillStyle = 'gold';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.restore();
        }
    }


    // UPDATE
    update(){
        if (!this.free){
            this.y -= this.speed;
            if (this.y < -this.height) this.reset();
        }
    }

    // START
    start(x,y){
        this.x = x - this.width * 0.5;
        this.y = y;
        this.free = false;
    }

    // RESET
    reset() {
        this.free = true;
    }
}
