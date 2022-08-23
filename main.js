//Board
var blockSize = 25;
var border = 3;
var rows = 25;
var cols = 25;
var board;
var context;

//Snake head
var snakeX;
var snakeY;

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

//Audio
let sound = new Audio('crash.mp3');

//Game over flag:
var gameOver = false;

window.onload = function()
{
    //Board configuration:
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    //Score:
    score_label = document.getElementById("score");

    //Food placement:
    placeFood();

    //Snake head placement:
    placeSnake();

    //Key events:
    document.addEventListener("keyup", changeDirection);
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    //Update every object:
    update();

    //Main loop:
    var refreshIntervalId = setInterval(update, 100);

}

function update_score_label()
// Plots score label
{
    score_label.innerHTML = `Score: ${score}`;
}

function update()
{
    if (gameOver)
    {
        return;
    }

    context.fillStyle="grey";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="black";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    context.fillStyle="white";
    context.fillRect(foodX+border, foodY+border, blockSize-2*border, blockSize-2*border);

    if (snakeX == foodX && snakeY == foodY)
    {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        update_score_label();
        sound.play();
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
    context.fillStyle="black";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    context.fillStyle="blue";
    context.fillRect(snakeX+border, snakeY+border, blockSize-2*border, blockSize-2*border);

    for (let i=0; i < snakeBody.length; i++)
    {
        context.fillStyle="black";
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        context.fillStyle="blue";
        context.fillRect(snakeBody[i][0]+border, snakeBody[i][1]+border, blockSize-2*border, blockSize-2*border);
    }

    check_boundaries();
    check_body();

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
    if ([foodX, foodY] in snakeBody)
    {
        placeFood();
    }
}

function placeSnake()
{
    snakeX = Math.floor(Math.random() * cols) * blockSize;
    snakeY = Math.floor(Math.random() * rows) * blockSize;
}

function check_boundaries()
{
    if (snakeX < 0 || snakeX >= cols*blockSize || snakeY < 0 || snakeY >= rows*blockSize)
    {
        gameOver = true;
        sound.play();
        alert("You crashed! Game Over");
    }
}

function check_body()
{
    for (let i=0; i < snakeBody.length; i++)
    {
        body_x = snakeBody[i][0];
        body_y = snakeBody[i][1];
        if (snakeX == body_x && snakeY == body_y)
        {
            gameOver = true;
            sound.play();
            alert("You ate yourself! Game Over");
            return;
        }
    }
}
