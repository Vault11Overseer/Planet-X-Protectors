// GAME
import { Planet } from './classes/Planet.js';
import { Player } from './classes/Player.js';
import { Projectile } from './classes/Projectile.js';
import { Enemy, Lobster, Asteroid, Beetle, Rhino } from './classes/Enemy.js';

// GAME CLASS
class Game {
    // GAME CONSTRUCTOR
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.debug = false;
        // NEW INSTANCE OF PLAYER . PLANET
        this.planet = new Planet(this);
        this.player = new Player(this);
        // PROJECTILE POOL ARRAY
        this.projectPool = [];
        this.numberOfProjectiles = 20;
        this.createProjectilePool();
        // ENEMY POOL ARRAY
        this.enemyPool = [];
        this.numberOfEnemies = 20;
        this.createEnemyPool();
        // ENEMY TIMER SYSTEM
        this.enemyPool[0].start();
        this.enemyTimer = 0;
        this.enemyInterval = 800;
        // SPRITE ANIMATION
        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 150;
        // SCORE LOGIC
        this.score = 0;
        this.winningScore = 50;
        this.lives = 30;
        // MOUSE TRACKING - SET MOUSE COORDINATES
        this.mouse = {x:0, y:0};

        // MOUSE MOVE EVENT - GET MOUSE COORDINATES 
        window.addEventListener('mousemove', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });

        // MOUSE DOWN EVENT - GET CLICK COORDINATES AND CALL SHOOT FUNCTION
        window.addEventListener('mousedown', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.player.shoot();
        });

        // KEYSTROKE - DEBUG MODE, AND FIRE BUTTON
        window.addEventListener('keyup', e => {
            if(e.key === 'd') this.debug = !this.debug;
            else if (e.key === 's') this.player.shoot();
        });
    }

    // GAME RENDER
    render(context, deltaTime){
        this.planet.draw(context);
        this.drawStatusText(context);1111
        this.player.draw(context);
        this.player.update();
        
        // RENDER PROJECTILE LOOP
        this.projectPool.forEach(projectile => {
            projectile.draw(context);
            projectile.update();
        });
        // LINE TO MOUSE
        // context.beginPath();
        // context.moveTo(this.planet.x, this.planet.y);
        // context.lineTo(this.mouse.x, this.mouse.y);
        // context.stroke();
        // if (this.game.debug){
        // };

        // RENDER ENEMY LOOP
        this.enemyPool.forEach(enemy => {
            enemy.draw(context);
            enemy.update();
        })

        // PERIODICALLY RENDER ENEMY 
        if (!this.gameOver) {
            if(this.enemyTimer < this.enemyInterval){
                this.enemyTimer += deltaTime;
            } else {
                this.enemyTimer = 0;
                const enemy = this.getEnemy();
                if (enemy) enemy.start();
            }    
        }
        
        // PERIODICALLY UPDATE SPRITES
        if(this.spriteTimer < this.spriteInterval){
            this.spriteTimer += deltaTime
            this.spriteUpdate = false;
        } else {
            this.spriteTimer =0;
            this.spriteUpdate = true;
        }

        if(this.score >= this.winningScore || this.lives < 1) this.gameOver = true;
        // console.log(this.spriteUpdate);
        
    }

    // GAME DRAW STATUS TEXT
    drawStatusText(context){
        context.save();
        context.textAlign ='left';
        context.font = '30px Impact';
        context.fillText('Score: ' + this.score, 20, 30);
        for ( let i = 0; i < this.lives; i++ ) {
            context.fillRect(20 + 15 * i, 60, 10, 30);
        }

        if (this.gameOver) {
            context.textAlign = 'center';
            let message1;
            let message2;
            if (this.score >= this.winningScore){
                let message1 = 'You win!';
                let message2 = 'Your score is ' + this.score + "!";    
            } else {
                message1 = 'You Lose!';
                message2 = 'Try Again!';
            }
        context.font = '100px Impact';
        context.fillText(message1, this.width * 0.5, 200);
        context.font = '50px Impact';
        context.fillText(message2, this.width * 0.5, 550);

        }
        context.restore();

    };

    // CALCULATE AIM
    calcAim(a,b){
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance * -1;
        const aimY = dy / distance * -1;
        return [ aimX, aimY, dx, dy ];
    };

    // CHECK COLLISION
    checkCollision(a, b){
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const sumOfRadii = a.radius + b.radius;

        return distance < sumOfRadii;
    };

    // CREATE PROJECTILE POOL
    createProjectilePool(){
        for (let i = 0; i < this.numberOfProjectiles; i++){
            this.projectPool.push(new Projectile(this));
        }
    }

    // GET PROJECTILE 
    getProjectile(){
        for (let i = 0; i < this.projectPool.length; i++){
            if(this.projectPool[i].free) return this.projectPool[i];
        }
    }

    // CREATE ENEMY POOL
    createEnemyPool(){
        for(let i = 0; i < this.numberOfEnemies; i++){
            let randomNumber = Math.random();
            if (randomNumber > 0.25) {
                this.enemyPool.push(new Asteroid(this));
            } else if (randomNumber < 0.5 ) {
                this.enemyPool.push(new Beetle(this));
            } else if (randomNumber < 0.75 ) {
                this.enemyPool.push(new Rhino(this));
            } else {
                this.enemyPool.push(new Lobster(this));
            }
        }
    }

    // GET ENEMY
    getEnemy(){
        for(let i = 0; i < this.enemyPool.length; i++){
            if (this.enemyPool[i].free) return this.enemyPool[i];
        }
    }
}


    window.addEventListener('load', function (){
        const canvas = this.document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 800;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'white';
        ctx.lineWidth = 2;
        ctx.font = '50px Helvetica';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const game = new Game(canvas);

        let lastTime = 0;

        function animate(timeStamp) {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            ctx.clearRect(0,0, canvas.width, canvas.height);
            game.render(ctx, deltaTime);
            window.requestAnimationFrame(animate);
            // requestAnimationFrame(animate);
            // console.log(deltaTime);
        }

        requestAnimationFrame(animate);
    }
)