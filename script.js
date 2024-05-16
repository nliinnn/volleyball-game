const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");

canvas.width = 1420;
canvas.height = 650;
offsetY = 50;

c.fillStyle = "white";
c.lineWidth = 3;
c.strokestyle = "white";

// const variables
// ---------------------------------------------------------
let gravity = 2;

const player = new Player(
  {
    // here we're passing through the object (x,y)
    x: canvas.width * 0.25,
    y: canvas.height - 300,
  },
  60, // height
  -35, // jump
  20 // speed
);

const net = new Net();

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./images/background.png",
});
// -----------------------------------------------------------

// ANIMATE FUNCTION
function animate() {
  window.requestAnimationFrame(animate);

  // creating the canvas
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // making the net
  net.draw();

  // drawing and updated the player
  c.save();
  // c.scale(1.5,1.5)
  c.translate(0, 120);
  background.update();
  c.restore();
  player.draw();
  player.update();

  //   console.log(player.velocity.x);
  c.restore();

  player.velocity.x = 0;

  // console.log(player.inAir == true);
  if (player.position.y >= canvas.height - player.height - offsetY) {
    if (keys.space.pressed) {
      player.velocity.y = player.jump;
    }
    player.inAir = false;
  } else {
    player.inAir = true;
  }

  if (player.inAir) {
    // if the player is in the air
    if (
      keys.d.pressed &&
      player.position.x < canvas.width * 0.5 - net.width - player.width - 20
    )
      player.velocity.x = 10;
    else if (keys.a.pressed && player.position.x > 0) player.velocity.x = -10;
  } else {
    if (
      keys.d.pressed &&
      player.position.x < canvas.width * 0.5 - net.width - player.width - 20
    )
      player.velocity.x = player.speed;
    else if (keys.a.pressed && player.position.x > 0)
      player.velocity.x = -player.speed;
  }
}
animate();

window.addEventListener("keydown", (event) => {
  //   console.log(event);
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case " ":
      keys.space.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case " ":
      keys.space.pressed = false;
      break;
  }
});
