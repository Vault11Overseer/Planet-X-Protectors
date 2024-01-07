// PLANET CLASS 
export class Planet {

    // PLANET CONSTRUCTOR
    constructor(game){
        this.game = game;
        this.image = document.getElementById('planet');
        this.x = this.game.width * 0.5;
        this.y = this.game.height * 0.5;
        this.radius = 60;
    }

    // PLANET DRAW
    draw(context) {
        // DRAW PLANET IMAGE
        context.drawImage(this.image, this.x - 100, this.y - 100);
        // DEBUG OPTION
        if(this.game.debug){
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.stroke();
        }
    }
    
}