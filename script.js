et backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  
  //setting location of frog, velocities of the cars and logs. Also setting the colors of the cars.
  frogX = width/2;
  frogY = height - 20;
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  car2X = width;
  car2Y = 400;
  car2V = -5;
  logX = 0;
  logY = 300;
  logV = 3;
  car1Color = 0;
  car2Color = 20;
  car1ColorChange = 1;
  car2ColorChange = -1;
}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  moveCars();
  drawCars();
  drawWater();
  drawLog();
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  moveLog();
  checkCollisions();
  checkWin();
  displayScores();
}

//assigning each key to a function
function keyPressed() {
  if (keyCode === UP_ARROW) {
    frogY -= 10;
  }
  if (keyCode === LEFT_ARROW) {
    frogX -= 10;
  }
  if (keyCode === RIGHT_ARROW) {
    frogX += 10;
  }
  if (keyCode === DOWN_ARROW) {
    frogY += 10;
  }
}

//moves the cars across the screen 
function moveCars() {
  car1X += car1V;
  if (car1X > width){
    car1X = 0 - car1Y;
  }
  car2X += car2V;
  if (car2X < 0 - car2Y){
    car2X = width;
  }
}

//draws the cars on the screen
function drawCars() {
  // Code for car 1
  fill(car1Color, 80, 80);
  rect(car1X, car1Y, 40, 30);
  fill(car2Color, 80, 80);
  rect(car2X, car2Y, 40, 30);
  // Code for additional cars
}

//draws the water for the log to be on
function drawWater() {
  fill("cyan");
  rect(0, 300, width, 50);
}

//checks if the frog collides with the cars, log, or water. If collides with car or water, restart and decrease lives. If collides with log, make the frog move with the log.
function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  collideOne = collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20);
  collideTwo = collideRectCircle(car2X, car2Y, 40, 30, frogX, frogY, 20);
  collideLog = collideRectCircle(logX, logY, 100, 50, frogX, frogY, 20);
  if (collideLog){
    frogX += logV; 
    if (frogX > width){
      frogX = 0 - 50;
      frogX += logV; 
    }
    collidesLog = true;
  }
  else{collidesLog = false;}
  if (collideRectCircle(0, 300, width, 50, frogX, frogY, 20) && !collidesLog){
    lives -=1;
    frogX = width/2;
    frogY = height - 20;
  }
  
  if (collideOne){
    lives -=1;
    frogX = width/2;
    frogY = height - 20;
  }
  if (collideTwo){
    lives -=1;
    frogX = width/2;
    frogY = height - 20;
  }
  if (lives == 0){
    gameIsOver = true;
  }
}

// If the frog makes it into the yellow gold zone, increment the score and move the frog back down to the bottom.
function checkWin() {
  if (frogY < 50){
    score += 1;
    frogX = width/2;
    frogY = height - 20;
  }
}

//displays the score and # of lives of the player
function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  
  // Display Score
  text(`Score: ${score}`, 10, 40);
  // Display game over message if the game is over
  if (gameIsOver){
    backgroundColor = 0;
    textSize(60);
    textAlign(CENTER);
    stroke(95);
    text("Game Over", width/2, height/2);
    textAlign(LEFT);
  }
}

//draws the logs
function drawLog(){
  fill("brown");
  rect(logX, logY, 100, 50);
}

//function to move the log across the screen
function moveLog(){
  logX += logV;
  if (logX > width){
    logX = 0 - logY;
  }
}
