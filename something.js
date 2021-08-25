console.log("")
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var HEIGHT = 500
var WIDTH = 500
var SIZE = 10
var score = 0
var gameOver = false
canvas.width = WIDTH
canvas.height = HEIGHT
// snake stuff
var snakeDx = 0
var snakeDy = 1
var growth = 3
var snake = [];
snake.push([25, 25]);

// apple
var apple = []
apple.push(randomInt(1, 50))
apple.push(randomInt(1, 50))


var int = setInterval(game, 100)

function game() {
  context.clearRect(0, 0, WIDTH, HEIGHT);

  for (var i = 0; i < snake.length; i++) {
    var seg = snake[i];
    //if we are on the head, draw it dark orange.
    if (i == 0) {
      drawShape(seg[0], seg[1], "green");
    }
    //otherwise draw it orange.
    else {
      drawShape(seg[0], seg[1], "white");
    }
  }
  
  var head = snake[0]
  console.log(head)
  checkSelf(head[0], head[1] )
  checkApple(head[0], head[1])
  checkWall(head[0], head[1])
  snake.unshift([head[0] + snakeDx, head[1] + snakeDy])
  if (growth > 0) {
    growth--

  }
  else {
    snake.pop()
  }
  drawShape(apple[0], apple[1], "red")
  if (gameOver) {
   clearInterval(int)
  }
}






function drawShape(x, y, color) {
  context.beginPath();
  context.arc(x * SIZE, y * SIZE, SIZE, 0, 2 *
    Math.PI);
  context.fillStyle = color
  context.fill();
  context.closePath();
}

var UP_KEY_CODE = 38;
var DOWN_KEY_CODE = 40;
var LEFT_KEY_CODE = 37;
var RIGHT_KEY_CODE = 39;

window.onkeydown = KeyDown
function KeyDown(event) {
  if (event.keyCode == UP_KEY_CODE) {
    snakeDx = 0;
    snakeDy = -1;
  }
  if (event.keyCode == DOWN_KEY_CODE) {
    snakeDx = 0;
    snakeDy = 1;
  }
  if (event.keyCode == LEFT_KEY_CODE) {
    snakeDx = -1;
    snakeDy = 0;
  }
  if (event.keyCode == RIGHT_KEY_CODE) {
    snakeDx = 1;
    snakeDy = 0;
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function checkSelf(x, y) {
  for (let i = 1; i < snake.length; i++) {
  var seg = snake[i]

    if (x == seg[0] && y == seg[1]) {
      gameOver = true
      console.log("gameover")
      break

    }
  }
}
function checkApple (x,y) {
  if (x == apple[0]&& y == apple[1]) {
    apple[0] = randomInt(1,50)
    apple[1] = randomInt(1,50)
    growth += 3
  }


}
function checkWall (x,y) {
  if (x == 0 || y == 0 || x == WIDTH / SIZE || y== HEIGHT / SIZE){
    gameOver = true

  }
