//Board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//Snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//Snake body
var snakeBody = [];

//Snake movement
velocityX = 0;
velocityY = 0;

//Food
var foodX;
var foodY;

//Game score:
var score = 0;
var score_label;

window.onload = function()
{
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);
    update();
    setInterval(update, 100);
    score_label = document.getElementById("score");
}

function update_score_label()
{
    score_label.innerHTML = `Score: ${score}`;
}

function update()
{
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="white";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY)
    {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        update_score_label();
    }

    for (let i = snakeBody.length-1 ; i > 0; i--)
    {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length)
    {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillStyle="blue";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();

    for (let i=0; i < snakeBody.length; i++)
    {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        context.lineWidth = 5;
        context.strokeStyle = "black";
        context.stroke();
    }
}

function changeDirection(e)
{
    switch(e.code)
    {
        case "ArrowUp":
            if (velocityY == 0)
            {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "ArrowDown":
            if (velocityY == 0)
            {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case "ArrowLeft":
            if (velocityX == 0)
            {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "ArrowRight":
            if (velocityX == 0)
            {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
}

function placeFood()
{
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}