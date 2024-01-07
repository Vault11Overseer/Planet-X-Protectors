class Boss {
    constructor(game){
        this.game = game;
  
        this.x;
        this.y;
        this.speedX;

    }
}


class Wave {
    constructor(game){
        this.game = game;
        this.nextWaveTrigger = false;

    }
}