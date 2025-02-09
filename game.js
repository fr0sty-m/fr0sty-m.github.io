const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let playerX = canvas.width / 2;
let playerY = canvas.height - 30;
const playerSpeed = 5;

const keys = [false, false, false, false];

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(playerX, playerY, 15, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateMovement();
  drawPlayer();
  requestAnimationFrame(updateGame);
}

function updateMovement() {
  if (keys[0]) {
    playerX -= playerSpeed;
  } else if (keys[1]) {
    playerX += playerSpeed;
  }
  if (keys[2]) {
    playerY -= playerSpeed;
  } else if (keys[3]) {
    playerY += playerSpeed;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key == "a" || e.key == "A") {
    keys[0] = true;
  } else if (e.key == "d" || e.key == "D") {
    keys[1] = true;
  }
  if (e.key == "w" || e.key == "W") {
    keys[2] = true;
  } else if (e.key == "s" || e.key == "S") {
    keys[3] = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == "a" || e.key == "A") {
    keys[0] = false;
  } else if (e.key == "d" || e.key == "D") {
    keys[1] = false;
  }
  if (e.key == "w" || e.key == "W") {
    keys[2] = false;
  } else if (e.key == "s" || e.key == "S") {
    keys[3] = false;
  }
});

updateGame();
