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
}

// PROJECTILE CLASS
 class Projectile {
    constructor (game) {
        this.game = game;
        this.x;
        this.y;
        this.radius = 20;
        this.speedX = 1;
        this.speedY = 1;
        this.free = true;
    }

    start(){
        this.free = false;
    }

    reset(){
        this.free = false;
    }

    draw(context){
        if(!this.free){
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        }
    }

    update(){
        if(!this.free){
            this.x += this.speedX;
            this.y += this.speedY;
        
        }
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
        this.numberOfProjectiles = 5;
        this.createProjectilePool();

        // MOUSE MOVE EVENT
        window.addEventListener('mousemove', e => {
            console.log(e);
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });

        window.addEventListener('mousedown', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.player.shoot();
        } )

        window.addEventListener('keyup', e => {
            if(e.key === 'd') this.debug = !this.debug;
        })
    }

    render(context){
        this.planet.draw(context);
        this.player.draw(context);
        this.player.update();
        // LINE TO MOUSE
        context.beginPath();
        context.moveTo(this.planet.x, this.planet.y);
        context.lineTo(this.mouse.x, this.mouse.y);
        // context.stroke();
        // if (this.game.debug){
           
        // };d
        
    }

    calcAim(a,b){
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance * -1;
        const aimY = dy / distance * -1;
        return [ aimX, aimY, dx, dy ];
    }

    createProjectilePool(){
        for (let i = 0; i < this.numberOfProjectiles; i++){
            this.projectPool.push(new Projectile(this))
        }
    }

    getProjectile(){
        for (let i = 0; i < this.projectPool.length; i++){
            if(this.projectPool[i].free) return this.projectPool[i];
        }
    }
}


    window.addEventListener('load', function (){
        const canvas = this.document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 800;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;

        const game = new Game(canvas);

        function animate() {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            game.render(ctx);
            // window.requestAnimationFrame(animate);
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }
)