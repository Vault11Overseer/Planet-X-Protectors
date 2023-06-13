// MAIN IMPORTS
import { Player } from './js/player.js';
import { InputHandler } from './js/input.js';
import { Background } from './js/background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './js/enemies.js';
import { UI } from './js/UI.js';

window.addEventListener('load', function(){
  // CANVAS
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 900; //500
  canvas.height = 500; //500

  // GAME CLASS
  class Game {
    constructor (width, height) {
      // CANVAS SIZE: AS VARIABLES
      this.width = width;
      this.height = height;
      // GROUND PLACEMNET
      this.groundMargin = 80;
      // SPEED
      this.speed = 0;
      this.maxSpeed = 3;
      // NEW INSTANCES
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      // UI
      this.UI = new UI(this);
      this.debug = false;
      this.floatingMessages = [];
      this.fontColor = 'red';
      // ENEMY
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      // EXTRA
      this.collisions = [];
      this.particles = [];
      this.maxParticles = 57;
      // GAME STATUS
      this.gameOver = false;
      // SCORE
      this.score = 0;
      this.winningScore = 40;
      this.lives = 5;
      // TIME
      this.time = 0;
      this.maxTime = 30000;
      // STATE
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }

    update(deltaTime){

      // TRACK THIS DOWN
      this.time += deltaTime;

      // TIMES UP
      if (this.time > this.maxTime) this.gameOver = true;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);

      // DRAW ENEMY
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {this.enemyTimer += deltaTime;}

      // ? pARTICLES
      if(this.particles.length > this.maxParticles) {this.particles = this.particles.slice(0, this.maxParticles);}


      // UPDATE ASSETS
      this.enemies.forEach(enemy => {enemy.update(deltaTime);});
      this.floatingMessages.forEach(message => {message.update();});
      this.particles.forEach((particle, index )=> {particle.update();});
      // ?
      this.collisions.forEach ((collision, index) => {collision.update(deltaTime);});

      // FILTER FOR DELETION
      this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
      this.particles = this.particles.filter(particle => !particle.markedForDeletion);
      this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
      this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
    }

    draw(context){
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy => {enemy.draw(context);});
      this.particles.forEach(particle => {particle.draw(context);});
      this.collisions.forEach(collision => {collision.draw(context);});
      this.floatingMessages.forEach(message => {message.draw(context);});
      this.UI.draw(context);
    }

    // ADD ENEMY TYPE
    addEnemy(){
      if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
  }


  // CALL NEW GAME
  const game = new Game(canvas.width, canvas.height);
  console.log(game);


  // TIME STAMP
  let lastTime = 0;

  function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    // console.log(deltaTime);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }
  animate(0);
});