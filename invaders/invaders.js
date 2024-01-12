class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    update () {
this.x += this.speed;
    }
}

class Projectile {
    constructor(){
        
    }

}


class Enemy {
    constructor(){
        
    }
}

class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
    }

    render (context){
        this.player.draw(context);
        this.player.update();
    }
}



window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;

    const game = new Game(canvas);
    game.render(ctx);
    // console.log(game);

    function animate(){
        game.render(ctx);
    }
})