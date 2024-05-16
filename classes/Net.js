class Net {
    constructor() {
      this.height = 400;
      this.width = 10;
      this.position = canvas.width * 0.5;
    }
    draw() {
      c.fillStyle = "blue";
      c.fillRect(
        this.position - this.width,
        canvas.height - this.height,
        this.width,
        this.height
      );
    }
  }