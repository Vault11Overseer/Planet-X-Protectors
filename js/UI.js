// USER INTERFACE CLASS
export class UI {

    constructor(game) {
        // BRING IN GAME
        this.game = game;
        // FONT SIZE
        this.fontSize = 30;
        // FONT tYPE
        this.fontFamily = 'Butcherman';
        this.livesImage = document.getElementById('lives');
    }

    draw(context){
        console.log(context);
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.shadowBlur = 0;
        // SCORE
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText('Score: ' + this.game.score, 20 ,50);
        // TIMER
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        // LIVES
        for (let i = 0; i < this.game.lives; i++) {context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);};
        // GAME OVER MESSAGE
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if (this.game.score >  this.game.winningScore) {
                context.fillText('You WIN', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
    
                context.fillText('Way to go', this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else {
                context.fillText('You Lose', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
                context.fillText('Better Luck Next Time', this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
        }
        context.restore();
    }
}