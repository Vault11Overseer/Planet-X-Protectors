// ENEMY CLASS
export class Enemy {
    // ENEMY CONSTRUCTOR
    constructor(game){
        this.game = game;
        this. x = 0;
        this.y = 0;
        this.radius = 40;
        this.width = this.radius * 2;
        this.height = this.radius* 2;
        this.speedX = 0;
        this.speedY = 0;
        this.speedModifier = Math.random() * 0.7 + 0.1;
        this.angle = 0;
        this.collided = false;
        this.free = true;
    }

    // ENEMY START
    start(){
        this.free = false;
        this.collided =false;
        this.frameX =0;
        this.lives =  this.maxLives;
        this.frameY = Math.floor(Math.random() * 4);
        if (Math.random() < 0.5){
            this.x = Math.random() * this.game.width;
            this.y = Math.random() < 0.5 ? -this.radius : this.game.height + this.radius;
        } else {
            this.x = Math.random() < 0.5 ? -this.radius : this.game.width + this.radius;
            this.y = Math.random() * this.game.height;
        }
        const aim = this.game.calcAim(this, this.game.planet);
        this.speedX = aim[0] * this.speedModifier;
        this.speedY = aim[1] * this.speedModifier;
        this.angle = Math.atan2(aim[3], aim[2]) + Math.PI * 0.5;
    }

    // ENEMY RESET
    reset(){
        this.free = true;
    }

    // ENEMY HIT
    hit(damage){
        this.lives -= damage;
        if(this.lives >= 1){
            this.frameX++;
        }
    }

    // ENEMY DRAW
    draw(context){
        if(!this.free){
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, -this.radius, - this.radius, this.width, this.height);
            // DEBUG OPTION
            if(this.game.debug){
                context.beginPath();
                context.arc(0,0 , this.radius, 0, Math.PI * 2);
                context.stroke();
                context.fillText(this.lives, 0,0);
            }
            context.restore();
            
        }
    }

    // ENEMY UPDATE
    update(){
        if(!this.free){
            this.x += this.speedX;
            this.y += this.speedY;

            // ENEMY / PLANET COLLISION
            if (this.game.checkCollision(this, this.game.planet) && this.lives >= 1){
                this.lives = 0;
                this.speedX = 0;
                this.speedY = 0;
                this.collided = true;
                this.game.lives--;

            }
             // ENEMY / PLAYER COLLISION
             if (this.game.checkCollision(this, this.game.player) && this.lives >= 1){
                this.lives = 0;
                this.collided = true;
                this.game.lives--;

            }

            // ENEMY / PROJECTILE COLLISION CHECK
            this.game.projectPool.forEach(projectile => {
                if(!projectile.free && this.game.checkCollision(this, projectile) && this.lives >=1){
                    projectile.reset();
                    this.hit(1);
                }
            });

            //sprite animation
            if(this.lives < 1 && this.game.spriteUpdate) {
                this.frameX++;
            }

            if(this.frameX > this.maxFrame) {
                this.reset();
                if(!this.collided && !this.game.gameOver) this.game.score += this.maxLives;
            }
        }
    }
}

// ASTEROID ENEMY CLASS
export class Asteroid extends Enemy {
    // ASTEROID CONSTRUCTOR 
    constructor(game){
        super(game);
        this.image = document.getElementById('asteroid');
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 4);
        this.maxFrame = 7;
        this.lives = 1;
        this.maxLives = this.lives;
    }
}


// BEETLE ENEMY CLASS
export class Beetle extends Enemy {
    // BEETLE CONSTRUCTOR
    constructor(game){
        super(game);
        this.image = document.getElementById('beetle');
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 4);
        this.maxFrame = 3;
        this.lives = 2;
        this.maxLives = this.lives;
    }
}

// LOBSTER ENEMY CLASS
export class Lobster extends Enemy {
    // LOBSTER CONSTRUCTOR
    constructor(game){
        super(game);
        this.image = document.getElementById('lobster');
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 4);
        this.maxFrame = 14;
        this.lives = 8;
        this.maxLives = this.lives;
    }
}


// RHINO ENEMY CLASS
export class Rhino extends Enemy {
    // RHINO CONSTRUCTOR
    constructor(game){
        super(game);
        this.image = document.getElementById('rhino');
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 4);
        this.maxFrame = 6;
        this.lives = 4;
        this.maxLives = this.lives;
    }
}