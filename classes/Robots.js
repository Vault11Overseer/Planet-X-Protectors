// REFACTOR CODE



window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas2');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;
    ctx.strokeStyle= 'white';
    ctx.lineWidth = 3;
   

    // ROBOT CLASS
    class Robot {
        // CONSTRUCTOR CLASS
        constructor(canvas) {
            this.canvas = canvas;
            // X & Y POSITIONS
            this.x = this.canvas.width * 0.7;
            this.y = this.canvas.height * 0.2;
            // CENTER POINT
            this.centerX = this.x;
            this.centerY = this.y;
            // RADIUS
            this.radius = 80;
            this.angle = 0;
            // SPRITE WIDTH & HEIGHT
            this.spriteWidth = 370;
            this.spriteHeight = 393;
            this.frameX = 0;
            this.maxFrame = 75;
            // BODY PARTS
            this.bodyImage = document.getElementById('body');
            this.bodySprite = document.getElementById('bodySprite');
            // EYE 1
            this.eye1Image = document.getElementById('eye1');
            this.eye1Radius = this.radius * 0.4;
            this.eye1Distance = this.eye1Radius;
            // EYE 2
            this.eye2Image = document.getElementById('eye2');
            this.eye2Radius = this.radius * 0.65;
            this.eye2Distance = this.eye2Radius;
            this.detectorLight = document.getElementById('detector-light');
            this.reflectionImage = document.getElementById('reflection');
            // MOVEMENT ANGLE = 0
            this.movementAngle = 0;
            // TRACKING
            this.tracking = false;
            // MOUSE
            this.mouse = {
                x: 0,
                y: 0
            }
        
            // MOUSE MOVE EVENT LISTENER
            this.canvas.addEventListener('mousemove', e => {
                console.log(this.angle);
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.tracking = true;
            });

            this.canvas.addEventListener('mouseleave', e => {
                console.log(this.angle);
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.tracking = false;
            });
            
        }
    





   // KEYSTROKE - DEBUG MODE, AND FIRE BUTTON
//    window.addEventListener('keyup', e => {
//     if (e.key === 'r') {this.restart()}
//     });
// }

 // RESTART - MAY NOT BE APPROPRIATE SPOT
//  restart(){

//     location.reload();
// };






        
        draw(context){
            // ROBOT BODY
            // context.drawImage(this.bodySprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - this.bodyImage.width * 0.5 + 65, this.y - this.bodyImage.height * 0.5 - 53, this.spriteWidth, this.spriteHeight);
            context.drawImage(this.bodySprite, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - this.bodyImage.width * 0.5 + 65, this.y - this.bodyImage.height * 0.5 - 53, this.spriteWidth, this.spriteHeight);

// ADD TO DEBUG       
            // context.beginPath();
            // context.arc(this.x,this.y,this.radius, 0, Math.PI * 2);
            // context.stroke();
            // EYEBALL 1
            context.drawImage(this.eye1Image,this.x + Math.cos(this.angle) * this.eye1Radius - this.eye1Image.width * 0.5, this.y + Math.sin(this.angle) * this.eye1Radius - this.eye1Image.height * 0.5);

// // ADD TO DEBUG       
//             context.beginPath();
//             context.arc(this.x + Math.cos(this.angle) * this.radius * 0.35 ,this.y + Math.sin(this.angle) * this.radius * 0.35,this.radius * 0.6, 0, Math.PI * 2);
//             context.stroke();
            // EYEBALL 2
            context.drawImage(this.eye2Image,this.x + Math.cos(this.angle) * this.eye2Radius - this.eye2Image.width * 0.5, this.y + Math.sin(this.angle) * this.eye2Radius - this.eye2Image.height * 0.5);
        
// // ADD TO DEBUG       
            // context.beginPath();
            // context.arc(this.x + Math.cos(this.angle) * this.radius * 0.6 ,this.y + Math.sin(this.angle) * this.radius * 0.6,this.radius * 0.3, 0, Math.PI * 2);
            // context.stroke();


            // REFLECTION
            context.drawImage(this.reflectionImage, this.x - this.reflectionImage.width * 0.5, this.y - this.reflectionImage.height * 0.5);
            // DETECTOR LIGHT
            if(this.tracking) {
            context.drawImage(this.detectorLight, this.x - this.detectorLight.width * 0.5, this.y - this.detectorLight.height * 0.5 - 190);

            }
        }

        update(){
            const dx = this.mouse.x -this.x;
            const dy = this.mouse.y -this.y;
            const distance = Math.hypot(dx, dy);

            this.angle = Math.atan2(dy, dx);

            if(distance <= this.eye1Distance * 2.5){
                this.eye1Radius = distance * 0.4;
                this.eye2Radius = distance * 0.65;
            } else if (this.tracking){
                this.eye1Radius = this.eye1Distance;
                this.eye2Radius = this.eye2Distance;
            } else {
                this.eye1Radius = this.eye1Distance * Math.cos(this.movementAngle);
                this.eye2Radius = this.eye2Distance * Math.cos(this.movementAngle);
            }

            // SPRITE ANIMATION
            this.frameX >= this.maxFrame ? this.frameX = 0 : this.frameX++;

            this.movementAngle += 0.005;
            this.x = this.centerX + Math.cos(this.movementAngle * 3) * 80;
            this.y = this.centerY + Math.sin(this.movementAngle * 0.5) * 150;

            if(this.movementAngle > Math.PI * 4) {
                this.movementAngle = 0;
            }

        }
    }

    // NEW ROBOT INSTANCE
    const robot = new Robot(canvas);

    // ANIMATE FUNCTION
    function animate(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        robot.draw(ctx);
        robot.update();
        requestAnimationFrame(animate);
    }

    animate();
});


