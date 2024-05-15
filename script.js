window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1455;
    canvas.height = 720;
  
    ctx.fillStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokestyle = "white";
  
    class Player {
      constructor(game) {
        this.game = game;
        this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;
        this.collisionradius = 30;
        this.speedX = 0;
        this.speedY = 0;
        this.dx = 0; // horizontal distance
        this.dy = 0; // vertical distance
        this.speedModifier = 10;
        this.speedModifierDown = 5;
        this.down;
      }
  
      draw(context) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionradius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
        context.beginPath();
        context.moveTo(this.collisionX, this.collisionY);
        context.lineTo(this.game.key.x, this.game.key.y);
        context.stroke();
      }
      update() {
        this.dx = this.game.key.x - this.collisionX;
        this.dy = this.game.key.y - this.collisionY;
        const distance = Math.hypot(this.dy, this.dx);
        if (distance > this.speedModifier) {
          this.speedX = this.dx / distance || 0;
          this.speedY = this.dy / distance || 0;
        } else {
          this.speedX = 0;
          this.speedY = 0;
        }
        this.collisionX += this.speedX * this.speedModifier;
        // console.log(this.down); 
        if (this.down) {
            this.collisionY += this.speedY * this.speedModifier;
        }else {
            this.collisionY += this.speedY * this.speedModifier*1.5; // change this later to account for going down
        }
      }
    }
  
    class Game {
      constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        this.key = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        }
  
        // event listeners
        window.addEventListener('keydown', (e) =>{
            console.log(e.code);
            console.log(this.key.x);
            switch(e.code) {
                case 'Space':
                    if(this.key.y != this.height*0.5 - 200){
                        this.key.y -= 200; 
                        this.player.down = false;
                    }
                    break;
                case 'KeyA':
                    this.key.x -= 100;
                    break;
                case 'KeyD':
                    this.key.x += 100;
                    break;
                case 'KeyO':
                    this.key.x = this.width * 0.5;
                    this.key.y = this.height * 0.5;
                    break;
            }
        });
        window.addEventListener('keyup', (e) =>{ 
            switch(e.code) {
                case 'Space':
                    // add a wait fxn
                    this.player.down = true; 
                    this.key.y += 200;
                    break;
                case 'KeyA':
                    console.log(this.key.x);
                    break;
                case 'KeyD':
                    console.log(this.key.x);
                    break;
            }
        });
        
      }
      render(context) {
        this.player.draw(context);
        this.player.update();
      }
    }
  
    const game = new Game(canvas);
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.render(ctx);
      window.requestAnimationFrame(animate);
    }
    animate();
  });
  