window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    // console.log(ctx);


    class Mandrake {
        constructor(){
            this.image = document.getElementById('mandrake');
            this.spriteWidth = 256;
            this.spriteHeight = 256;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = 20;
            this.y = 50;
            this.minFrame = 0;
            this.maxFrame = 355;
        }
    
        draw (context){
            context.drawImage(this.image, 6 * this.spriteWidth, 8 * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }

        update(){

        }

    }
    const mandrake = new Mandrake();
    // console.log("Mandrake: ", mandrake);

    function animate () {
        mandrake.draw(ctx);
    }

    animate();
})