// PLANET X PROTECTORS
import { Boss } from './classes/nBoss.js';
import { Projectile } from './classes/nProjectile.js';
import { Wave } from './classes/nWave.js';
import { Player } from './classes/nPlayer.js'; 

// GAME CLASS
class Game {
    // GAME CONSTRUCTOR
    constructor(canvas){
        // CANVAS
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // KEYS ARRAY
        this.keys = [];

        // CALL NEW PLAYER
        this.player = new Player(this);

        // PROJECTILES
        this.projectilesPool = [];
        this.numberOfProjectiles = 15;
        this.createProjectiles();
        this.fired = false;

        // WAVES
        this.columns = 2;
        this.rows = 2;
        this.enemySize = 80;

        this.waves = [];
        // this.waves.push(new Wave(this));
        this.waveCount = 1;

        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 150;

        this.score = 0;
        this.gameOver = false;

        this.bossArray = [];
        this.bossLives = 10;
        this.restart();


        // KEYDOWN EVENT LISTENER
        window.addEventListener('keydown', e => {
            // console.log(e.key);
            if(e.key === 'a' && !this.fired) this.player.shoot();
            this.fired = true;
            if(this.keys.indexOf(e.key) === -1) this.keys.push(e.key);

            if(e.key === 'r' && this.gameOver) this.restart();
            // console.log(this.keys)
        })

        // KEYUP EVENT LISTENER
        window.addEventListener('keyup', e => {
            this.fired = false;
            const index = this.keys.indexOf(e.key);
            if (index > -1) this.keys.splice(index, 1);
        });

    }

    

    // RENDER METHOD
    render (context, deltaTime){

        // SPRITE TIMING
        if (this.spriteTimer > this.spriteInterval){
            this.spriteUpdate = true;
            this.spriteTimer = 0;
        } else {
            this.spriteUpdate = false;
            this.spriteTimer += deltaTime;
        };


        this.drawStatusText(context);
        this.projectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        });
        this.player.draw(context);
        this.player.update();
        this.bossArray.forEach(boss => {
            boss.draw(context);
            boss.update();
        })
        this.bossArray = this.bossArray.filter(object => !object.markedForDeletion);

  

      
        this.waves.forEach(wave => {
            wave.render(context);
            if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver){
                this.newWave();
                wave.nextWaveTrigger = true;
            }
        })
    }

    // PROJECTILES
    // CREATING PROJECTILES
    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectiles; i++){
            this.projectilesPool.push(new Projectile());
        }
    };

    // GETTING PROJECTILES
    getProjectile(){
        for(let i = 0; i < this.projectilesPool.length; i++) {
            if (this.projectilesPool[i].free) return this.projectilesPool[i];
        }
    }

    // COLLISION
    checkCollision(a,b){
        return(
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        )
    }

    // DRAW STATUS TEXT
    drawStatusText(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.fillText('Score : ' + this.score, 20, 40);
        context.fillText('Wave Count : ' + this.waveCount, 20, 80);

        for(let i = 0; i < this.player.maxLives; i++){
            context.strokeRect(20 + 20 * i,100,10,15);
        }


        for(let i = 0; i < this.player.lives; i++){
            context.fillRect(20 + 20 * i,100,10,15);
        }

        // ENERGY BAR
        context.save();
        this.player.cooldown ? context.fillStyle = 'red' : context.fillStyle = 'gold';
        for (let i = 0; i < this.player.energy; i++){
            context.fillRect(20 + 2 * i, 130, 2, 15);
        }
        context.restore();
        // GAME OVER TEXT
        if(this.gameOver){
            context.textAlign = 'center';
            context.font = '100px impact';
            context.fillText('GAME OVER', this.width * 0.5, this.height * 0.5);
            context.font = '20px impact';
            context.fillText('Press R to restart', this.width * 0.5, this.height * 0.5 + 30);
        }
        context.restore();
    }

    // NEW WAVE
    newWave(){
        this.waveCount++;
        if(this.player.lives < this.player.maxLives)this.player.lives++;

        if(this.waveCount % 2 === 0){
            this.bossArray.push(new Boss(this, this.bossLives));
        } else {
            if (Math.random() < 0.5 && this.columns * this.enemySize < this.width * 0.8){
                this.columns++;
            } else if (this.rows * this.enemySize < this.height * 0.6) {
                this.rows++;
            }
            this.waves.push(new Wave(this));

        }
        
        this.waves = this.waves.filter(object => !object.markedForDeletion);
        // console.log(this.waves)
    }


    // GAME RESTART
    restart(){
        this.player.restart();

        this.columns = 2;
        this.rows = 2;

        this.waves = [];
        this.bossArray = [];
        this.bossLives = 10;

        // this.waves.push(new Wave(this));
        this.bossArray.push(new Boss(this, this.bossLives))
        this.waveCount = 1;

        this.score = 0;
        this.gameOver = false;
    }
}


// WINDOW LOAD FUNCTION
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.font = '30px Impact';

    // CALL NEW GAME AND RENDER
    const game = new Game(canvas);
    // game.render(ctx);


    let lastTime = 0;

    // ANIMATE FUNCTION
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render(ctx, deltaTime);
        window.requestAnimationFrame(animate);
    }
    animate(0)
});