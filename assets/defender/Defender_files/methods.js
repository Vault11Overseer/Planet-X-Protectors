// PLANET CLASS 
class Planet {
    // PLANET CONSTRUCTOR
    constructor(game){
        this.game = game;
        this.x = this.game.width * 0.5;
        this.y = this.game.height * 0.5;
        this.radius = 80;
        this.image = document.getElementById('planet');
    }
    // DRAW
    draw(context) {
        
        context.drawImage(this.image, this.x - 100, this.y - 100);
        if(this.game.debug){
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.stroke();
        }
        
    }
}

// PLAYER CLASS
class Player {
    constructor(game){
        this.game = game;
        this.x = this.game.width * 0.5;
        this.y = this.game.height * 0.5;
        this.radius = 40;
        this.image = document.getElementById('player');
        this.aim;
        this.angle = 0;
    }

    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle)
        context.drawImage(this.image, -this.radius, -this.radius);
        if (this.game.debug){
            context.beginPath();
            context.arc(0, 0, this.radius, 0, Math.PI * 2);
            context.stroke();    
        }
        context.restore();

    }

    update() {
        this.aim = this.game.calcAim(this.game.planet, this.game.mouse );
        // console.log(this.aim);
        this.x = this.game.planet.x + (this.game.planet.radius + this.radius) * this.aim[0];
        this.y = this.game.planet.y + (this.game.planet.radius + this.radius) * this.aim[1];
        this.angle = Math.atan2(this.aim[3], this.aim[2]);

    }

    shoot(){
        const projectile = this.game.getProjectile();
        if(projectile) projectile.start(this.x + this.radius * this.aim[0], this.y + this.radius * this.aim[1], this.aim[0], this.aim[1]);
        // console.log(projectile);
    }
}

// PROJECTILE CLASS
 class Projectile {
    // CONSTRUCTOR METHOD FOR PROJECTILE
    constructor (game) {
        this.game = game;
        this.x;
        this.y;
        this.radius = 5;
        this.speedX = 1;
        this.speedY = 1;
        this.speedModifier = 5;
        this.free = true;
    }

    // START METHOD FOR PROJECTILE
    start(x, y, speedX, speedY){
        this.free = false;
        this.x = x;
        this.y = y;
        this.speedX = speedX * this.speedModifier;
        this.speedY = speedY * this.speedModifier;
    }

    // RESET METHOD FOR PROJECTILE
    reset(){
        this.free = true;
    }

    // DRAW METHOD FOR PROJECTILE
    draw(context){
        if(!this.free){
            context.save();
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI *2);
            context.fillStyle = 'gold';
            context.fill();
            context.restore();
        }
    }

    // UPDATE METHOD FOR PROJECTILE
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

// ENEMY CLASS
class Enemy {

    constructor(game){
        this.game = game;
        this. x = 0;
        this.y = 0;
        this.radius = 40;
        this.width = this.radius * 2;
        this.height = this.radius* 2;
        this.speedX = 0;
        this.speedY = 0;
        this.free = true;
    }

    start(){
        this.free = false;
        this.frameX =0;
        this.lives =  this.maxLives;
        this.frameY = Math.floor(Math.random() * 4);
        if (Math.random() < 0.5){
            this.x = Math.random() * this.game.width;
            this.y = Math.random() < 0.5 ? -this.radius : this.game.height + this.radius;
        } else {
            this.x = Math.random() < 0.5 ? -this.radius : this.game.width + this.game.radius;
            this.y = Math.random() * this.game.height;
        }
        const aim = this.game.calcAim(this, this.game.planet);
        this.speedX = aim[0];
        this.speedY = aim[1];
    }

    reset(){
        this.free = true;
    }

    hit(damage){
        this.lives -= damage;
    }

    draw(context){
        if(!this.free){
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x -this.radius, this.y - this.radius, this.width, this.height);
            if(this.game.debug){
                context.beginPath();
                context.arc(this.x, this.y , this.radius, 0, Math.PI * 2);
                context.stroke();
                context.fillText(this.lives, this.x, this.y);
            }
            
        }
    }

    update(){
        if(!this.free){
            this.x += this.speedX;
            this.y += this.speedY;
            // PLANET COLLISION
            if (this.game.checkCollision(this, this.game.planet)){
                this.reset();
            }
             // PLAYER COLLISION
             if (this.game.checkCollision(this, this.game.player)){
                this.reset();
            }

            // check collision
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
            if(this.frameX > this.maxFrame) this.reset();
        }
    }
}

// ASTEROID ENEMY CLASS
class Asteroid extends Enemy {
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

// GAME CLASS
class Game {
    // GAME CONSTRUCTOR
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.planet = new Planet(this);
        this.player = new Player(this);
        this.mouse = {x:0, y:0};
        this.debug = true;

        this.projectPool = [];
        this.numberOfProjectiles = 20;
        this.createProjectilePool();
        // console.log(this.projectPool);

        this.enemyPool = [];
        this.numberOfEnemies = 20;
        this.createEnemyPool();
        // console.log(this.enemyPool);
        this.enemyPool[0].start();
        this.enemyTimer = 0;
        this.enemyInterval = 1700;

        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 150;



        // MOUSE MOVE EVENT
        window.addEventListener('mousemove', e => {
            // console.log(e);
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });

        // MOUSE DOWN EVENT
        window.addEventListener('mousedown', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.player.shoot();
        });

        window.addEventListener('keyup', e => {
            if(e.key === 'd') this.debug = !this.debug;
            else if (e.key === '1') this.player.shoot();
        })
    }

    render(context, deltaTime){
        this.planet.draw(context);
        this.player.draw(context);
        this.player.update();
        this.projectPool.forEach(projectile => {
            projectile.draw(context);
            projectile.update();
        } );
        // LINE TO MOUSE
        // context.beginPath();
        // context.moveTo(this.planet.x, this.planet.y);
        // context.lineTo(this.mouse.x, this.mouse.y);
        // context.stroke();
        // if (this.game.debug){
           
        // };

        this.enemyPool.forEach(enemy => {
            enemy.draw(context);
            enemy.update();
        })

        // PERIODICALLY RENDER ENEMY 
        if(this.enemyTimer < this.enemyInterval){
            this.enemyTimer += deltaTime;
        } else {
            this.enemyTimer = 0;
            const enemy = this.getEnemy();
            if (enemy) enemy.start();
        }

        //update sprites
        if(this.spriteTimer < this.spriteInterval){
            this.spriteTimer += deltaTime
            this.spriteUpdate = false;
        } else {
            this.spriteTimer =0;
            this.spriteUpdate = true;
        }
        // console.log(this.spriteUpdate);
        
    }

    calcAim(a,b){
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance * -1;
        const aimY = dy / distance * -1;
        return [ aimX, aimY, dx, dy ];
    }

    checkCollision(a, b){
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const sumOfRadii = a.radius + b.radius;
        return distance < sumOfRadii;
    }

    createProjectilePool(){
        for (let i = 0; i < this.numberOfProjectiles; i++){
            this.projectPool.push(new Projectile(this));
        }
    }

    getProjectile(){
        for (let i = 0; i < this.projectPool.length; i++){
            if(this.projectPool[i].free) return this.projectPool[i];
        }
    }

    createEnemyPool(){
        for(let i = 0; i < this.numberOfEnemies; i++){
            this.enemyPool.push(new Asteroid(this));
        }
    }

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
            // window.requestAnimationFrame(animate);
            requestAnimationFrame(animate);
            // console.log(deltaTime);
        }

        requestAnimationFrame(animate);
    }
)