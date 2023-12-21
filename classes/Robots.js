window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas2');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;
    ctx.strokeStyle= 'white';
    ctx.lineWidth = 3;
   


    class Robot {

        constructor(canvas) {
            this.canvas = canvas;
            this.x = this.canvas.width * 0.5;
            this.y = this.canvas.height * 0.5;
            this.bodyImage = document.getElementById('body');
            this.bodySprite = document.getElementById('bodySprite');

            this.eye1Image = document.getElementById('eye1');
            this.eye2Image = document.getElementById('eye2');
            this.reflectionImage = document.getElementById('reflection');

            this.radius = 80;
            this.angle = 0;
            this.mouse = {
                x: 0,
                y: 0
            }
        
            this.canvas.addEventListener('mousemove', e => {
                console.log(this.angle);
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
            });
        }
    
        draw (context){
            // ROBOT BODY
            context.drawImage(this.bodySprite, this.x - this.bodyImage.width * 0.5 + 65, this.y - this.bodyImage.height * 0.5 - 53);
// ADD TO DEBUG       
            // context.beginPath();
            // context.arc(this.x,this.y,this.radius, 0, Math.PI * 2);
            // context.stroke();
            // EYEBALL 1
            context.drawImage(this.eye1Image,this.x + Math.cos(this.angle) * this.radius * 0.4 - this.eye1Image.width * 0.5, this.y + Math.sin(this.angle) * this.radius * 0.4 - this.eye1Image.height * 0.5);

// // ADD TO DEBUG       
//             context.beginPath();
//             context.arc(this.x + Math.cos(this.angle) * this.radius * 0.35 ,this.y + Math.sin(this.angle) * this.radius * 0.35,this.radius * 0.6, 0, Math.PI * 2);
//             context.stroke();
            // EYEBALL 2
            context.drawImage(this.eye2Image,this.x + Math.cos(this.angle) * this.radius * 0.65 - this.eye2Image.width * 0.5, this.y + Math.sin(this.angle) * this.radius * 0.65 - this.eye2Image.height * 0.5);
        
// // ADD TO DEBUG       
            // context.beginPath();
            // context.arc(this.x + Math.cos(this.angle) * this.radius * 0.6 ,this.y + Math.sin(this.angle) * this.radius * 0.6,this.radius * 0.3, 0, Math.PI * 2);
            // context.stroke();


            // REFLECTION
            context.drawImage(this.reflectionImage, this.x - this.reflectionImage.width * 0.5, this.y - this.reflectionImage.height * 0.5);

        }

        update(){
            const dx = this.mouse.x -this.x;
            const dy = this.mouse.y -this.y;
            this.angle = Math.atan2(dy, dx);
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


