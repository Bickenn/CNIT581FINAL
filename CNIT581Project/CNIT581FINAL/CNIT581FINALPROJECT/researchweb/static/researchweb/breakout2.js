let boardWidth = 500; //sets the canvas board to 500px across
let boardHeight = 500; //sets the canvas board to 500px high
let context;

//player variables
let playerHeight = 10;
let playerWidth = 80;
let playerVelocityX = 10;

let player = { //player object
    x: boardWidth/2 - playerWidth/2, //centers the paddle in the middle of the board with the lop left point being 0,0 on the paddle
    y:boardHeight - playerHeight - 5, //moves the paddle up on to the canvas and away from the ground by 5 pixels
    width : playerWidth,
    height : playerHeight,
    velocityX: playerVelocityX
}


//ball variables
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 1;
let ballVelocityY = 1;

let ball = { //ball object
    x: boardWidth/2,
    y: boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
}

//block variables
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3; //add more as game goes on
let blockMaxRows = 10; //limit so that the rows of blocks do not do down to the player paddle
let blockCount = 0;

//starting block corner top left
let blockX = 15;
let blockY = 45;

let score = 0;
let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //draw the intial player
    context.fillStyle = "blue"; //the color the paddle at the bottom of the screen will be
    context.fillRect(player.x, player.y, player.width, player.height) //fills the rectangle starting at point (player.x, player.y) to point (player.width, player.height)

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer); //calls the movePlayer function when a key is pressed

    //create the blocks
    createBlocks();

}

function update() {
    requestAnimationFrame(update); //constantly repaints the canvas to update player position
    if(gameOver) { // if the game is over do not update the canvas anymore
        return;
    }

    context.clearRect(0, 0, board.width, board.height); //redraws the fram so that there are no overlapping frames
    
    //player
    context.fillStyle = "blue";
    context.fillRect(player.x, player.y, player.width, player.height);

    //draws the ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    //bounce ball off walls
    if (ball.y <= 0) {
        //if ball touches the top of the canvas
        ball.velocityY *= -1;
    }
    else if (ball.x <=0 || (ball.x + ball.width) >= boardWidth) {
        //this cover if the ball touches the left or right right of the canvas
        ball.velocityX *= -1; //reberse direction
    }
    else if (ball.y + ball.height >= boardHeight){
        //end the game
        context.font = "20px sans serif";
        context.fillText("Game Over: Press 'R' to Restart", 80, 400);
        gameOver = true;

    }

    //bounce ball off paddle
    if(topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1; //flip direction of ball either up or down
    }
    else if(leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1; //flips direction of ball either right or left
    }

    //draws the blocks
    context.fillStyle = "blue";
    for(i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if(!block.break) {
            if(topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true;
                ball.velocityY *= -1; //flip the ball's vertical direction
                blockCount -= 1; //remove a block from the array
                score += 100;
            }
            else if(leftCollision(ball, block) || rightCollision(ball, block)) {
                block.break = true;
                ball.velocityX *= -1; //flip the ball's horizontal direction
                blockCount -= 1; //remove a block from the array
                score += 100;
            }
            context.fillRect(block.x, block.y, block.width, block.height);

        }   
    }

    //score display
    context.font = "20px sans-serif";
    context.fillText(score, 10, 25);
}

function outOfBounds(xPosition) { //checks to see if the paddle is out of bounds
    return (xPosition < 0 || xPosition + playerWidth > boardWidth); //xPosition + playerWidth is necessary because xPositon is on the very left side of the paddle
}

function movePlayer(e){ //function to move the paddle
    if(gameOver) { //checks to see if the game is over
        if(e.code == "KeyR") { //checks to see if spacebar is entered
            resetGame();
        }
    }
    if(e.code =="ArrowLeft") { //moves left on left arrow key
        //player.x -= player.velocityX;
        let nextPlayerX = player.x - player.velocityX;
        if (!outOfBounds(nextPlayerX)) {
            player.x = nextPlayerX;
        }
    }
    else if (e.code == "ArrowRight") { //moves right on right arrow key
        //player.x += player.velocityX;
        let nextPlayerX = player.x + player.velocityX;
        if (!outOfBounds(nextPlayerX)) {
            player.x = nextPlayerX;
        }
    }
}

function detectCollison(a, b) {
    return a.x < b.x + b.width && //a's top left cornet doesn't reach b's top right corner
            a.x + a.width > b.x && //a's top right corner passes b's top left corner
            a.y < b.y + b.height && //a's top left corner does not reach b's bottom left corner
            a.y + a.height > b.y; //a's bottom left corner passes b's top left corner
    
}

function topCollision(ball, block) { //a is above b (ball is above block)
    return detectCollison(ball, block) && (ball.y + ball.height)>= block.y;
}

function bottomCollision(ball, block) { //a is below b (ball is below block)
    return detectCollison(ball, block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball, block) { //a is left b (ball is left block)
    return detectCollison(ball, block) && (ball.x + block.width) >= ball.x;
}

function rightCollision(ball, block) { //a is right of b (ball is right of block)
    return detectCollison(ball, block) && (block.x + block.width) >= ball.x;
}

function createBlocks() {
    blockArray = []; //clears the block array
    for(let c = 0; c < blockColumns; c++) { //iterate until c is equal to the amount of block columns
        for (let r = 0; r < blockRows; r++) { //iterate until r is equal to the amount of block rows
            let block = { //block object
                x: blockX + c*blockWidth + c*10, //the c*10 provides spacing between the blocks
                y: blockY + r*blockHeight + r*10, // the r*10 provides spacing between the blocks
                width: blockWidth,
                height: blockHeight,
                break: false
            }
            blockArray.push(block); //pushes the block into the array
        }
    }
    blockCount = blockArray.length;
}

function resetGame(){
    gameOver = false;

    player = { //player object
        x: boardWidth/2 - playerWidth/2, //centers the paddle in the middle of the board with the lop left point being 0,0 on the paddle
        y:boardHeight - playerHeight - 5, //moves the paddle up on to the canvas and away from the ground by 5 pixels
        width : playerWidth,
        height : playerHeight,
        velocityX: playerVelocityX
    }

    ball = { //ball object
        x: boardWidth/2,
        y: boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX: ballVelocityX,
        velocityY: ballVelocityY
    }

    blockArray = []; //resets the block array
    score = 0; //resets the score
    createBlocks(); //creates new blocks

}