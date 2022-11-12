document.addEventListener("DOMContentLoaded", function (params) {
  let direction = 1;
  let score = 0;
  let speedTime = 0;
  let appleIndex = 0;
  // 2 is the head, 1- body, 0 -the tail of the snake
  let currentSnake = [2, 1, 0];
  let squares = document.querySelectorAll(".squares-container div");
  let startResetButton = document.querySelector(".start-reset-button");
  let displayScore = document.querySelector(".score");
  let gameInterval = 0;
  const width = 10;
  //
  // Function to start and reset the game
  function startResetGame() {
    squares.forEach((square) => {
      square.classList.remove("snake");
      square.classList.remove("apple");
    });

    clearInterval(gameInterval);
    score = 0;
    speedTime = 300;
    displayScore.textContent = score;
    direction = 1;
    currentSnake = [2, 1, 0];

    randomApple();
    gameInterval = setInterval(runTheGame, speedTime);
    currentSnake.forEach((snakePart) => {
      squares[snakePart].classList.add("snake");
    });
  }
  // All activities of the snake
  function runTheGame() {
    console.log(currentSnake[0]);
    // if hits the right border
    if (currentSnake[0] % width === width - 1 && direction === 1) {
      // the below code is for passing trough the wall , in progress
      // currentSnake[0] = currentSnake[0] - width + 1;
      alert(`GAME OVER`);
      startResetGame();
      // if hits the left border
    } else if (currentSnake[0] % width === 0 && direction === -1) {
      alert(`GAME OVER`);
      startResetGame();
      // if hits the up border
    } else if (currentSnake[0] - width < 0 && direction === -10) {
      console.log(currentSnake[0]);
      alert(`GAME OVER`);
      startResetGame();
      // if hits the bottom border
    } else if (currentSnake[0] >= width * width) {
      alert(`GAME OVER`);
      startResetGame();
    }

    //  Remove class snake of the tail
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    //Moving the snake forward , unshift 0 index of the snake plus direction of movement
    currentSnake.unshift(currentSnake[0] + direction);
    squares[currentSnake[0]].classList.add("snake");

    // If the snake  eat an apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[currentSnake[0]].classList.add("snake");
      currentSnake.push(currentSnake[0]);
      score++;
      displayScore.textContent = score;
      console.log(speedTime);
      speedTime -= 10;
      clearInterval(gameInterval);
      gameInterval = setInterval(runTheGame, speedTime);
      randomApple();
    }
    currentSnake.forEach((snakePart) => {
      squares[snakePart].classList.add("snake");
    });
  }

  //Controlling the snake
  function controlSnake(e) {
    // squares[currentIndex].classList.remove("snake");
    if (e.keyCode === 37) {
      // left
      direction = -1;
      console.log(e.keyCode);
    } else if (e.keyCode === 38) {
      // top
      direction = -width;
      console.log(e.keyCode);
    } else if (e.keyCode === 39) {
      direction = 1;
      // right
      console.log(e.keyCode);
    } else if (e.keyCode === 40) {
      direction = +width;
      // down
      console.log(e.keyCode);
    }
  }

  // Creating random apples
  function randomApple() {
    appleIndex = Math.floor(Math.random() * squares.length - 1);

    currentSnake.forEach((part) => {
      if (appleIndex === currentSnake[part]) {
        console.log(`equal !`);
        squares[appleIndex].classList.remove("apple");
        squares[appleIndex].classList.add("snake");
        appleIndex = Math.floor(Math.random() * squares.length - 1);
      } else {
        squares[appleIndex].classList.add("apple");
      }
    });

    // if (!squares[appleIndex].classList.contains("snake")) {
    //   squares[appleIndex].classList.add("apple");

    //   console.log(`contains snake`);
    // }
  }

  document.addEventListener("keyup", controlSnake);
  startResetButton.addEventListener("click", startResetGame);
});

//
