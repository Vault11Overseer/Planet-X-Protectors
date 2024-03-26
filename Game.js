// GAME
import { Planet } from './classes/Planet.js';
import { Player } from './classes/Player.js';
import { Projectile } from './classes/Projectile.js';
import { Asteroid, Beetle, Lobster, Rhino, Boss } from './classes/Enemy.js';
    
// GAME CLASS
class Game {
    // GAME CONSTRUCTOR
    constructor(canvas) {
        // CANVAS DIMENSIONS
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // DEBUG OFF
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
        this.winningScore = 5;
        this.lives = 15;

        // MOUSE TRACKING - SET MOUSE COORDINATES
        this.mouse = {x:0, y:0};






        
        // START
        // this.start();

        // ???? NEW
        // SOUND HANDLER
        this.explosion1 = document.getElementById('explosion1');
        this.explosion2 = document.getElementById('explosion2');
        this.explosion3 = document.getElementById('explosion3');
        this.explosion4 = document.getElementById('explosion4');
        this.explosion5 = document.getElementById('explosion5');
        this.explosion6 = document.getElementById('explosion6');
        this.explosionSounds = [this.explosion1, this.explosion2, this.explosion3, this.explosion4, this.explosion5, this.explosion6];
        this.sound = this.explosionSounds[4];

        // MOUSE MOVE EVENT - GET MOUSE COORDINATES 
        window.addEventListener('mousemove', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });


        // ??????
        // MOUSE DOWN EVENT - GET CLICK COORDINATES AND CALL SHOOT FUNCTION
        window.addEventListener('mousedown', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.player.shoot();
            this.sound.play();

        });

        // LOOK AT
        // function restart (){
        //   location.reload();  
        // }

        // window.addEventListener('resize', e =>{
        //     // console.log(this);
        //     this.resize(e.target.innerWidth, e.target.innerHeight);
        // })


        // ??????
        // KEYSTROKE - DEBUG MODE, AND FIRE BUTTON
        window.addEventListener('keyup', e => {
            if(e.key === 'd') {this.debug = !this.debug}
            else if (e.key === 's' || e.key === 'a') {
                this.player.shoot();
                this.sound.play();
            }
            else if (e.key === 'r') {restart()}
        });
    }

    // start(){
    //     this.resize(e.traget.innerWidth, e.target.innerHeight);
    // }
    //     // NEW RISIZE 
    //     resize(width, height){
    //     this.canvas.width;
    //     this.canvas.height;
    //     this.width = width;
    //     this.height = height;
    //     this.ctx.fillStyle = 'green';
    // }


    // PLAY SOUND

    play(){
        this.sound.currentTime = 0;
        this.sound.play();
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
     
        if (this.debug){
            context.beginPath();
            context.moveTo(this.planet.x, this.planet.y);
            context.lineTo(this.mouse.x, this.mouse.y);
            context.stroke();
        };

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
        // CONTEXT SAVE
        context.save();
        // MAIN GAME SCORE
        context.textAlign ='left';
        context.font = '30px Impact';
        context.fillText('Score: ' + this.score, 20, 30);
        // LIVES BARS
        for ( let i = 0; i < this.lives; i++ ) {
            context.fillRect(20 + 15 * i, 60, 10, 30);
        }

        // GAME OVER TEXT
        if (this.gameOver) {
            context.textAlign = 'center';
            let message1;
            let message2;
            let message3;
            // WIN GAME TEXT
            if (this.score >= this.winningScore){
                message1 = 'You win!';
                message2 = 'Planet Y has been saved!';
                message3 = 'Your score is: ' + this.score + "!";    
            // LOOSE GAME TEXT
            } else {
                message1 = 'GAME OVER';
                message2 = 'Planet Y has been over run!';
                message3 = 'Your Score: ' + this.score + '!';
            }
        // MESSAGE 1
        context.font = '80px Impact';
        context.fillText(message1, this.width * 0.5, 160);
        // MESSAGE 2
        context.font = '40px Impact';
        context.fillText(message2, this.width * 0.5, 220)
        // MESSAGE 3
        context.font = '50px Impact';
        context.fillText(message3, this.width * 0.5, 550);
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
            if (randomNumber < 0.25) {
                this.enemyPool.push(new Asteroid(this));
            } else if (randomNumber < 0.5 ) {
                this.enemyPool.push(new Beetle(this));
            } else if (randomNumber > 0.75 ) {
                this.enemyPool.push(new Lobster(this));
            } else {
                this.enemyPool.push(new Boss(this));
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

    // WINDOW EVENT LISTENER
    window.addEventListener('load', function (){
        // PULL ELEMENTS
        const canvas = this.document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');
        // CANVAS WIDTH
        canvas.width = 800;
        // CANVAS HEIGHT
        canvas.height = 800;
        // CANVAS TYPOGRAPHY
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'white';
        ctx.lineWidth = 2;
        ctx.font = '50px Helvetica';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // NEW INSTANCE OF GAME
        const game = new Game(canvas);

        // LAST TIME VARIABLE FOR ANIMATE FUNCTION
        let lastTime = 0;
        // ANIMATE FUNCTION
        function animate(timeStamp) {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            ctx.clearRect(0,0, canvas.width, canvas.height);
            game.render(ctx, deltaTime);
            window.requestAnimationFrame(animate);
        }
        // REQUEST ANIMATION FRAME AND PASS IT ANIMATE
        requestAnimationFrame(animate);
    }
)





// / BUBBLE SOUND 1
// const bubblePop1 = document.createElement('audio');
// bubblePop1.src = './assets/sounds/Plop.ogg';

// BUBBLE SOUND 2
// const bubblePop2 = document.createElement('audio');
// bubblePop2.src = './assets/sounds/bubbles-single2.wav';

// function handleBubbles(){

//     if (gameFrame % 50 == 0){bubblesArray.push(new Bubble());}

//     for (let i = 0; i < bubblesArray.length; i++){
//         bubblesArray[i].update();
//         bubblesArray[i].draw();
//         if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2){
//             bubblesArray.splice(i,1);
//             i--;
//         } else if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius){
//                 if(!bubblesArray[i].counted){
//                     if(bubblesArray[i].sound == 'sound1'){
//                         bubblePop1.play();
//                     } else {
//                         bubblePop2.play();
//                     }
//                     score++;
//                     bubblesArray[i].counted = true;
//                     bubblesArray.splice(i, 1);
//                     i--;
//                 }
//         }
//     }
//     for (let i = 0; i < bubblesArray.length; i ++){

//     }
// }




// REPEATING BACKGROUNDS
// const background = new Image();
// background.src = "background1.png";

// const BG = {
//     x1: 0,
//     x2: canvas.width,
//     y: 0,
//     width: canvas.width,
//     height: canvas.height,
// }

// function handleBackground(){
//     BG.x1 -= gameSpeed;
//     if (BG.x1 < -BG.width) BG.x1 = BG.width;
//     BG.x2 -= gameSpeed;
//     if (BG.x1 < -BG.width) BG.x1 = BG.width;
//     ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
//     ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);

// }


// function handleGameOver(){
//     ctx.fillStyle = 'white';
//     ctx.fillText('GAME OVER, you reached score ' + score, 120, 250);
//     gameOver = true;
// }