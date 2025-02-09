const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define the game constants
const gridSize = 20;
const canvasWidth = 800;
const canvasHeight = 600;

// Snake variables
let snake = [
  { x: 160, y: 300 },
  { x: 140, y: 300 },
  { x: 120, y: 300 },
];
let dx = gridSize;
let dy = 0;
let changingDirection = false;

// Food variables
let foodX;
let foodY;

// Game score
let score = 0;

// Randomly generate food position
function generateFood() {
  foodX = Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize;
  foodY = Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize;
}

// Draw the snake on the canvas
function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// Draw the food on the canvas
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, gridSize, gridSize);
}

// Move the snake based on direction
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if snake eats food
  if (head.x === foodX && head.y === foodY) {
    score += 10;
    generateFood();
  } else {
    snake.pop();
  }
}

// Check if the snake collides with walls or itself
function checkCollision() {
  // Check if snake hits the walls
  if (
    snake[0].x < 0 ||
    snake[0].x >= canvasWidth ||
    snake[0].y < 0 ||
    snake[0].y >= canvasHeight
  ) {
    return true;
  }

  // Check if snake collides with itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  return false;
}

// Change direction based on key press
function changeDirection(event) {
  if (changingDirection) return;
  changingDirection = true;

  const keyPressed = event.keyCode;

  if (keyPressed === 37 && dx === 0) {
    dx = -gridSize;
    dy = 0;
  } else if (keyPressed === 38 && dy === 0) {
    dx = 0;
    dy = -gridSize;
  } else if (keyPressed === 39 && dx === 0) {
    dx = gridSize;
    dy = 0;
  } else if (keyPressed === 40 && dy === 0) {
    dx = 0;
    dy = gridSize;
  }
}

// Draw the score on the canvas
function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

// Game over function
function gameOver() {
  ctx.fillStyle = "black";
  ctx.font = "40px Arial";
  ctx.fillText("Game Over", canvasWidth / 2 - 100, canvasHeight / 2);
  ctx.font = "20px Arial";
  ctx.fillText(
    "Press F5 to Restart",
    canvasWidth / 2 - 90,
    canvasHeight / 2 + 30,
  );
  clearInterval(gameLoop); // Stop the game loop
}

// Game update loop
function updateGame() {
  changingDirection = false;
  moveSnake();

  if (checkCollision()) {
    gameOver();
    return;
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear canvas
  drawSnake();
  drawFood();
  drawScore();
}

// Start the game by generating the first food
generateFood();

// Set up key event listener
document.addEventListener("keydown", changeDirection);

// Set up game loop (runs 10 times per second)
const gameLoop = setInterval(updateGame, 100);
