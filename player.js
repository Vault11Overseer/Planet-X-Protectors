import { Sitting, Running, Jumping, Falling } from './playerState.js';

export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        // this.image = player;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    } 


    update(input){
        this.currentState.handleInput(input);
        // HORIZONTAL MOVEMENT
        this.x += this.speed;
        if(input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width) this.x = this.game.width - this.width;
        // VERTICAL MOVEMENT
        // if (input.includes('ArrowUp') && this.onTheGround()) this.vy -= 30;
        this.y += this.vy;
        if (!this.onTheGround()) this.vy  += this.weight;
        else this.vy = 0;
    }

    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,this.width, this.height, this.x, this.y, this.width, this.height);
    }

    onTheGround(){
        return this.y >= this.game.height - this.height;
    }

    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}