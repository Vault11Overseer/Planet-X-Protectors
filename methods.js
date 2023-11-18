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
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
        
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
    }

    draw(context){
        context.drawImage(this.image, this.x - this.radius, this.y - this.radius);
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
    }

    update() {
        this.x = this.game.mouse.x;
        this.y = this.game.mouse.y;

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

        // MOUSE MOVE EVENT
        window.addEventListener('mousemove', e => {
            console.log(e);
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        })
    }

    render(context){
        this.planet.draw(context);
        this.player.draw(context);
        this.player.update();
        context.beginPath();
        context.moveTo(this.planet.x, this.planet.y);
        context.lineTo(this.mouse.x, this.mouse.y);
        context.stroke();
    }

    calcAim(a,b){
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance;
        const aimY = dy / distance;
        return [ aimX, aimY, dx, dy ];
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