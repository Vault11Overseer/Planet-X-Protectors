// SPACE INVADERS``

// CLASS PLAYER
class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 10;
    }

    // DRAW
    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    // UPDATE
    update () {
        // HORIZONTAL MOVEMENT
        if(this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
        if(this.game.keys.indexOf('ArrowRight') > -1) this.x += this.speed;
        // HORIZONTAL BOUNDARIES
        if(this.x < -this.width * 0.5) this.x = -this.width * 0.5;
        else if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;

    }

    // SHOOT
    shoot(){
        const projectile = this.game.getProjectile();
        if(projectile) projectile.start(this.x + this.width * 0.5, this.y);
    }
    
}


// PROJECTILE CLASS
class Projectile {
    // CONSTRUCTOR
    constructor(){
        this.width = 8;
        this.height = 40;
        this.x = 0;
        this.y = 0;
        this.speed = 20;
        this.free = true;
    }

    // DRAW
    draw(context){
        if (!this.free){
            context.fillRect(this.x, this.y, this.width, this.height);
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

// ENEMY CLASS
class Enemy {
    // CONSTRUCTOR
    constructor(game, positionX, positionY){
        this.game = game;
        this.width = this.game.enemySize;
        this.height = this.game.enemySize;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.markedForDeletion = false;
    }

    // DRAW
    draw(context){
        context.strokeRect(this.x, this.y, this.width, this.height);
    }

    // UPDATE
    update(x,y) {
        this.x = x + this.positionX;
        this.y = y + this.positionY;

        // CHECK FOR COLLISION
        this.game.projectilesPool.forEach(projectile => {
            if(!projectile.free && this.game.checkCollision(this, projectile)){
                this.markedForDeletion = true;
                projectile.reset();
                this.game.score++;
            }
        });
        if (this.y + this.height > this.game.height){
            this.game.gameOver = true;
            this.markedForDeletion = true;
        }
    }
}


class Wave {
    constructor(game){
        this.game = game;
        this.width = this.game.columns * this.game.enemySize;
        this.height = this.game.rows * this.game.enemySize;
        this.x = 0;
        this.y = -this.height;
        this.speedX = 3;
        this.speedY = 0;
        this.enemies = [];
        this.nextWaveTrigger = false;
        this.create();
    }

    render(context){
        if(this.y < 0)this.y += 5;
        this.speedY =0;
        // context.strokeRect(this.x, this.y, this.width, this.height)
        if(this.x < 0 || this.x > this.game.width -this.width){
            this.speedX *= -1;
            this.speedY = this.game.enemySize;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.enemies.forEach(enemy => {
            enemy.update(this.x, this.y);
            enemy.draw(context);
        })
        this.enemies = this.enemies.filter(object => !object.markedForDeletion);
    }

    create(){
        for(let y = 0; y < this.game.rows; y++){
            for (let x = 0; x < this.game.columns; x++){
                let enemyX = x * this.game.enemySize;
                let enemyY = y * this.game.enemySize;
                this.enemies.push(new Enemy(this.game, enemyX, enemyY));

            }
        }
    }
}

class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];

        this.player = new Player(this);
        this.projectilesPool = [];
        this.numberOfProjectiles = 10;
        this.createProjectiles();

        this.columns = 3;
        this.rows = 3;
        this.enemySize = 60;

        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;

        this.score = 0;
        this.gameOver = false;


        window.addEventListener('keydown', e => {
            // console.log(e.key);
            if(this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if(e.key === '1') this.player.shoot();
            // console.log(this.keys)
        })

        window.addEventListener('keyup', e => {
            // console.log(e.key);
            const index = this.keys.indexOf(e.key);
            if (index > -1) this.keys.splice(index, 1);
            // console.log(this.keys)
        });

    }

    render (context){
        this.drawStatusText(context);
        this.player.draw(context);
        this.player.update();
        this.projectilesPool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        });
        this.waves.forEach(wave => {
            wave.render(context);
            if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver){
                this.newWave();
                this.waveCount++;
                WaveShaperNode.nextWaveTrigger = true;
            }
        })
    }

    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectiles; i++){
            this.projectilesPool.push(new Projectile());
        }
    };

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

    drawStatusText(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.fillText('Score : ' + this.score, 20, 40);
        context.fillText('Wave Count : ' + this.waveCount, 20, 80);

        if(this.gameOver){
            context.textAlign = 'center';
            context.font = '100px impact';
            context.fillText('GAME OVER', this.width * 0.5, this.height * 0.5);
        }
        context.restore();
    }

    newWave(){
        if (Math.random() < 0.5 && this.columns * this.enemySize < this.width * 0){
            this.columns++;
        } else {
            this.rows++;
        }
        this.waves.push(new Wave(this));

    }
}



window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.font = '30px Impact';


    const game = new Game(canvas);
    game.render(ctx);

    function animate(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render(ctx);
        window.requestAnimationFrame(animate);
    }

    animate()
})