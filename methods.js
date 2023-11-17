class Planet {
    constructor(game){
        this.game = game;
        this.x = this.game.width * 0.5;
        this.y = this.game.height * 0.5;
        this.radius = 80;
        this.image = document.getElementById('planet');
    }

    draw(context) {
        context.drawImage(this.image, this.x - 100, this.y - 100);
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
    }
}


class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.wdith = this.canvas.width;
        this.height = this.canvas.height;
        this.planet = new Planet(this);

        window.addEventListener('mousemove', e => {
            console.log(e);
        })
    }

    render(context){
        this.planet.draw(context);
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
    game.render(ctx);
}
)