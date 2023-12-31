const gameboard = document.getElementById("gameboard");
const cpucheck = document.getElementById("cpucheck");
const ctx = gameboard.getContext("2d");

let boardWidth = 500;
let boardHeight = 500;
let paddleSpin = 1.5; // >= 0.0
let paddleForce = 1.1; // >= 1.0
let paddleWidth = 25;
let paddleLength = 100;
let ballRadius = 12.5;

let ball;
let paddleL;
let paddleR;
let scoreL = 0;
let scoreR = 0;

function resetGame() {
    clearInterval(intervalID); // clear the clock
    gameboard.width = boardWidth;
    gameboard.height = boardHeight;
    
    resetBall();
    resetPaddles();

    nextTick(); // start running the clock
}

function resetPaddles() {
    paddleL = new Paddle(0, 0, paddleLength, paddleWidth, "white");
    paddleR = new Paddle(boardWidth-paddleWidth, 0, paddleLength, paddleWidth, "white");
}

function resetBall() {
    ball = new Ball(boardWidth/2, boardHeight/2, 1, -1, ballRadius, "white");
}

function clearBoard() {
    ctx.fillStyle = "black";
    ctx.lineWidth = 10;
    ctx.fillRect(0, 0, boardWidth, boardHeight);
}

function draw() {
    clearBoard();
    
    ball.draw(ctx);
    paddleL.draw(ctx);
    paddleR.draw(ctx);
}

let intervalID;

function nextTick() {
    intervalID = setTimeout(
        () => {
            paddleL.move();
            if (cpucheck.checked) {
                paddleR.moveCPU(ball);
            } else {
                paddleR.move();
            }

            ball.bounceWall();
            if (ball.bouncePaddleL(paddleL)) {
                score("right");
            }
            if (ball.bouncePaddleR(paddleR)) {
                score("left");
            }
            ball.move();

            draw();
            nextTick();
        }, 10
    );
}

function score(player) {
    if (player == "left") scoreL++;
    if (player == "right") scoreR++;
    

    updateScore();
    resetBall();
}

function updateScore() {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = `${scoreL} : ${scoreR}`;
}

function innerLine() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(10, 10);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
}