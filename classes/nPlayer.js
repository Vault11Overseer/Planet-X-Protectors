import {LargeLaser, SmallLaser} from '../assets/nLasers.js';


// CLASS PLAYER
export class Player {
    constructor(game){
        this.game = game;
        this.width = 140;
        this.height = 120;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
        this.lives = 3;
        this.maxLives = 10;
        this.image = document.getElementById('player');
        this.jets_image = document.getElementById('playerjets');

        this.frameX = 0;
        this.jetsFrame = 1;

        this.smallLaser = new SmallLaser(this.game);
        this.largeLaser = new LargeLaser(this.game);

        this.energy = 50;
        this.maxEnergy = 100;
        this.cooldown = false;


    }

    // DRAW
    draw(context){
        // HANDLE SPRITE FRAME LOGIC
        if (this.game.keys.indexOf('a') > -1) {
            this.frameX = 1;
        } else if (this.game.keys.indexOf('s') > -1) {
            // this.frameX = 2;
            this.smallLaser.render(context)
        } else if (this.game.keys.indexOf('d') > -1) {
            // this.frameX = 3;
            this.largeLaser.render(context)
        } 
        else {
            this.frameX = 0;
        }

        // PLAYER JETS
        context.drawImage(this.jets_image, this.jetsFrame * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        

    }

    // UPDATE
    update () {
        // ENERGY
        if( this.energy < this.maxEnergy) this.energy += 0.05;
        if (this.energy < 1) this.cooldown = true;
        else if (this.energy > this.maxEnergy * 0.2) this.cooldown = false;
        // HORIZONTAL MOVEMENT
        if(this.game.keys.indexOf('ArrowLeft') > -1) {
            this.x -= this.speed;
            this.jetsFrame = 0;
        } else if(this.game.keys.indexOf('ArrowRight') > -1) {
            this.x += this.speed;
            this.jetsFrame = 2;
        } else {
            this.jetsFrame = 1;
        }
        
        
        // HORIZONTAL BOUNDARIES
        if(this.x < -this.width * 0.5) this.x = -this.width * 0.5;
        else if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;

    }

    // SHOOT
    shoot(){
        const projectile = this.game.getProjectile();
        if(projectile) projectile.start(this.x + this.width * 0.5, this.y);
    }

    restart(){
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.lives = 3;
    }
    
}
