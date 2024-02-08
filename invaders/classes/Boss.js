export class Boss {
    constructor(game, bossLives){
        this.game = game;
        this.width = 200;
        this.height = 200;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = -this.height;
        this.speedX = Math.random() < 0.5 ? -1 : 1;
        this.speedY = 0;
        this.lives = bossLives;
        this.maxLives = this.lives;
        this.markedForDeletion = false;
        this.image = document.getElementById('boss');
        this.frameX = 1;
        this.frameY = Math.floor(Math.random() * 4);
        this.maxFrame = 11;
    }


    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height )
        if(this.lives >= 1) {
            context.save();
            context.textAlign = 'center';
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
    context.shadowColor = 'black';
            context.fillText(Math.floor(this.lives), this.x + this.width * 0.5, this.y + 50)
            context.restore();
        }
        
    }

    update(){
        this.speedY = 0;
        if(this.game.spriteUpdate && this.lives >= 1) this.frameX = 0;
        if(this.y < 0) this.y += 4;
        if(this.x < 0 || this.x > this.game.width - this.width && this.lives >= 1){
            this.speedX *= -1;
            this.speedY = this.height * 0.5;
        }
        this.x += this.speedX;
        this.y += this.speedY;


        // BOSS ? PROJECTILE COLLISION CHECK
        this.game.projectilesPool.forEach(projectile => {
            if(this.game.checkCollision(this, projectile) && !projectile.free && this.lives >= 1) {
                this.hit(1);
                projectile.reset();
            }
        })

        // boss player collison
        if (this.game.checkCollision(this, this.game.player) && this.lives >= 1){
            this.game.gameOver = true;
            this.lives = 0;
        }

        // BOOS DESTROYED
        if(this.lives < 1 && this.game.spriteUpdate){
            this.frameX++;
            if(this.frameX > this.maxFrame){
                this.markedForDeletion = true;
                this.game.score += this.maxLives;
                this.game.bossLives += 5;
                if(!this.game.gameOver) this.game.newWave();
            }
        }

        // lose condition
        if (this.y + this.height > this.game.height) this.game.gameOver = true;
    }

    hit(damage){
        this.lives -= damage;
        if (this.lives >= 1) this.frameX =1;
    }
}
