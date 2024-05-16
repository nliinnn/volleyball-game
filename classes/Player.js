class Player {
  constructor(position, height, jump, speed) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = height;
    this.jump = jump;
    this.speed = speed;
    this.width = 50;
    this.inAir = false;

    this.attackBox = {
        position: this.position,
        width: 100,
        height: 20
    }
  }

  draw() {
    c.fillStyle = "red";
    // c.fillRect(this.position.x, this.position.y, 100, this.height);
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    c.fillStyle = 'yellow'
    c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
  }

  update() {
    // updates x and y position
    this.position.y += this.velocity.y;

    this.position.x += this.velocity.x;

    // if (this.position.x)

    if (
      this.position.y + this.height + this.velocity.y <
      canvas.height - offsetY
    ) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
