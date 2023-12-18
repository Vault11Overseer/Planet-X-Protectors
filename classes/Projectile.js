// PROJECTILE CLASS
export class Projectile {
    // PROJECTILE CONSTRUCTOR
    constructor (game) {
        this.game = game;
        this.x;
        this.y;
        // RADIUS
        this.radius = 3;
        // SPEED
        this.speedX = 1;
        this.speedY = 1;
        this.speedModifier = 8;
        // FREE
        this.free = true;
    }

    // PROJECTILE START
    start(x, y, speedX, speedY){
        this.free = false;
        this.x = x;
        this.y = y;
        this.speedX = speedX * this.speedModifier;
        this.speedY = speedY * this.speedModifier;
    }

    // PROJECTILE RESET
    reset(){this.free = true;}

    // PROJECTILE DRAW
    draw(context){
        // IF FREE IN POOL
        if(!this.free){
            context.save();
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI *2);
            context.fillStyle = 'white';
            context.fill();
            context.restore();
        }
    }

    // PROJECTILE UPDATE
    update(){
        if(!this.free){
            this.x += this.speedX;
            this.y += this.speedY;
        
            // RESET IF OUTSIDE THE VISIBLE GAME AREA
            if (this.x < 0 || this.x > this.game.width || this.y < 0 || this.y > this.game.height){
                this.reset();
            }
        }
    }

 }