const gameBoard = document.querySelector("#gameBoard"); //gets the gameBoard element inside of the css file
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText"); //gets the scoreText element from the css file
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width; //sets the game board's width to the width defined in canvas tag within the html file which is 500px
const gameHeight = gameBoard.height; //sets the game board's height to the height defined in canvas tag within the html file which is also 500px
const boardBackground = "white"; //sets the canvas background to white
const snakeColor = "lightgreen"; //sets the snake's color to green
const snakeBorder = "black"; //adds a black border around the snake 
const foodColor = "red"; //sets the color of the food to red
const unitSize = 25; //sets the size of the food to 25 pixels
let running = false; //checks to see if the game is running or not
let xVelocity = unitSize; //sets the horizontal velocity to 25 pixels so that the snake moves one tile every game tick
let yVelocity = 0; //starts the game with the snake unable to move up or down for the first game tick;
let foodX; //the x coordinate of the object
let foodY; //the y coordinate of the object
let score = 0; //sets the score to zero at the start of the gam
let snake = [ //defines the snake array 
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection); //creates a event listener that listens for a keydown event that calls the function changeDirection
resetBtn.addEventListener("click", resetGame); //creates an event listener so that when the reset button is clicked it calls the function resetGame

gameStart();

function gameStart(){
    running= true; //sets the game to running
    scoreText.textContent = score; //sets the scoreText to display whatever our score is
    createFood(); //creates a food at a coordinate
    drawFood(); //fills in the food at the coordinate generated in the previous createFood function call
    nextTick(); 
};
function nextTick(){ //advances the game tick by tick
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick(); // advances to the next tick
        }, 75); //sets it so that a game tick occurs every 75 milliseconds
    }
    else{
        displayGameOver(); //if the game is not running then display the game over screen
    }
};
function clearBoard(){ //clears the gameboard
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight); //fills the rectangle from the top left (0,0) to the bottom right (500,500) or gameWidth/gameHeight
};
function createFood(){ //creates the food at a random place
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize; //calculates a random number that is divisable by unitSize which is 25
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize); //calls the random function to generate a random x value for the food
    foodY = randomFood(0, gameWidth - unitSize); //calls the random function to generate a random y value for the food
};
function drawFood(){
    ctx.fillStyle = foodColor; //sets the fill to the red color declared earlier so the food will now be red
    ctx.fillRect(foodX, foodY, unitSize, unitSize); //fills a rectangle at the coordinates foodX, foodY that is unitSize(25) wide and unitSize tall
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity, //defines the head of the snake as the first object inside of the snanke array
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1; //increases the score by one
        scoreText.textContent = score; //increases the value on the score display by 1
        createFood(); //creates a new food piece on the board
    }
    else{
        snake.pop();
    }     
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => { //iterates through each segment
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize); //fills the rectangle at the coordinate with size 25x25
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize); //fills the border around the snake
    })
};
function changeDirection(event){ //updates the snake and lets the snake turn
    const keyPressed = event.keyCode; //saves the key presses as a number
    const LEFT = 65;
    const UP = 87;
    const RIGHT = 68;
    const DOWN = 83;

    const goingUp = (yVelocity == -unitSize); //sets the y velocity to negative so that the snake goes up
    const goingDown = (yVelocity == unitSize); //sets the y velocity to positive so that the snake goes down
    const goingRight = (xVelocity == unitSize); //sets the x velocity to negative so that the snake turns left
    const goingLeft = (xVelocity == -unitSize); //sets the x velocity to negative so that the snake turns right
 
    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver(){ //checks to see if there is a game over
    switch(true){
        case (snake[0].x < 0): //checks to see if the snake has gone out-of-bounds to the left
            running = false;
            break;
        case (snake[0].x >= gameWidth): //checks to see if the snake has gone out-of-bounds to the right
            running = false;
            break;
        case (snake[0].y < 0): //checks to see if the snake has gone out-of-bounds on the top
            running = false;
            break;
        case (snake[0].y >= gameHeight): //checks to see if the snake has gone out-of-bounds on the bottom
                running = false;
                break;
    }
    for(let i = 1; i < snake.length; i+=1){ //iterates through each segment to see if they collide with the head segment
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false; //stops the game
        }
    }
};
function displayGameOver(){ //displays the game over screen
    ctx.font = "50px MV Boli"; //picks size and font
    ctx.fillStyle = "black"; //picks text color
    ctx.textAlign = "center"; //aligns the text
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame(){ //resets the game
    score = 0; //resets the score
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};