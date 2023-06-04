document.addEventListener("DOMContentLoaded", function () {
  let direction = 1;
  let score = 0;
  let speedTime = 0;
  let appleIndex = 0;
  // 2 is the head, 1- body, 0 -the tail of the snake
  let currentSnake = [2, 1, 0];
  let gameInterval = 0;
  const width = 10;
  const squares = document.querySelectorAll(".squares-container div");
  const startResetButton = document.querySelector(".start-reset-button");
  const displayScore = document.querySelector(".score");
  const gameOverDisplay = document.querySelector(".game-over");
  
  // Variables for touch movement
  let touchXStart = 0;
  let touchYStart = 0;


  //
  // Function to start and reset the game
  function startResetGame() {
    // squares.forEach((square) => {
    //   square.classList.remove("snake");
    //   square.classList.remove("apple");
    // });
    currentSnake.forEach((part) => {
      squares[part].classList.remove("snake");
    });
    squares[appleIndex].classList.remove("apple");

    clearInterval(gameInterval);
    score = 0;
    speedTime = 300;
    displayScore.textContent = score;
    direction = 1;
    currentSnake = [2, 1, 0];
    appleIndex = 0;
    gameInterval = setInterval(runTheGame, speedTime);
    currentSnake.forEach((snakePart) => {
      squares[snakePart].classList.add("snake");
    });
    randomApple();
    gameOverDisplay.style.display = "none";
  }
  //touch movement part
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);

// Handle touch start event
function handleTouchStart(e) {
  touchXStart = e.touches[0].clientX;
  touchYStart = e.touches[0].clientY;
}

// Handle touch move event
function handleTouchMove(e) {
  if (!touchXStart || !touchYStart) {
    return;
  }

  let touchXEnd = e.touches[0].clientX;
    let touchYEnd = e.touches[0].clientY;

    let touchXDiff = touchXStart - touchXEnd;
    let touchYDiff = touchYStart - touchYEnd;

    if (Math.abs(touchXDiff) > Math.abs(touchYDiff)) {
      // Horizontal movement
      if (touchXDiff > 0) {
        // Swipe left
        direction = -1;
      } else {
        // Swipe right
        direction = 1;
      }
    } else {
      // Vertical movement
      if (touchYDiff > 0) {
        // Swipe up
        direction = -width;
      } else {
        // Swipe down
        direction = width;
      }
    }

    // Reset touch variables
    touchXStart = 0;
    touchYStart = 0;
  }
  // All activities of the snake
  function runTheGame() {
    if (
      currentSnake[0] + direction > 0 &&
      currentSnake[0] + direction < width * width
    ) {
      if (
        squares[currentSnake[0] + direction].classList.contains("snake") &&
        direction
      ) {
        squares.forEach((square) => {
          square.classList.remove("snake");
          square.classList.remove("apple");
        });
        clearInterval(gameInterval);
        gameOverDisplay.style.display = "block";
        return;

        // startResetGame();
      }
    }
    //  Variant 1 - if the snake hits borders and itself - Game variant 1
    // if (
    //   (currentSnake[0] % width === width - 1 && direction === 1) || //right
    //   (currentSnake[0] % width === 0 && direction === -1) || // left
    //   (currentSnake[0] - width < 0 && direction === -width) || // up
    //   (currentSnake[0] >= width * width && direction === width) || // down
    //   squares[currentSnake[0] + direction].classList.contains("snake")
    // ) {
    //   alert(`GAME OVER`);
    //   return clearInterval(gameInterval);
    // }
    // let tail = currentSnake.pop();
    // squares[tail].classList.remove("snake");
    // //Moving the snake forward , unshift 0 index of the snake plus direction of movement
    // currentSnake.unshift(currentSnake[0] + direction);

    ////////////

    /// Variant 2 - move trough walls

    //  Remove class snake of the tail
    let tail = currentSnake.pop();
    console.log(tail);
    squares[tail].classList.remove("snake");
    //Moving the snake forward , unshift 0 index of the snake plus direction of movement
    currentSnake.unshift(currentSnake[0] + direction);
    /////////////////

    //right
    if (currentSnake[0] % width === 0 && direction === 1) {
      currentSnake[0] -= width;
      squares[currentSnake[0]].classList.add("snake");
    }
    //left
    if (currentSnake[0] < 0 && direction === -1) {
      currentSnake[0] = width - 1;
    } else if (currentSnake[0] % width === width - 1 && direction === -1) {
      currentSnake[0] += width;
      squares[currentSnake[0]].classList.add("snake");
      // up
    } else if (currentSnake[0] < 0 && direction === -width) {
      currentSnake[0] = width * width + currentSnake[0] - width + width;
      squares[currentSnake[0]].classList.add("snake");
      //down
    } else if (currentSnake[0] >= width * width && direction === width) {
      console.log(`more than 0`);
      currentSnake[0] = currentSnake[0] % width;
      squares[currentSnake[0]].classList.add("snake");
    }

    //////////////

    // If the snake  eat an apple
    if (
      squares[currentSnake[0]] &&
      squares[currentSnake[0]].classList.contains("apple")
    ) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[currentSnake[0]].classList.add("snake");
      currentSnake.push(currentSnake[0]);
      score++;
      displayScore.textContent = score;
      speedTime -= 10;
      clearInterval(gameInterval);
      gameInterval = setInterval(runTheGame, speedTime);
      randomApple();
    }

    // Adding snake class to snake parts
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
    appleIndex = Math.floor(Math.random() * squares.length);
    if (squares[appleIndex].classList.contains("snake")) {
      console.log(`have snake !`);
      appleIndex = Math.floor(Math.random() * squares.length);
    }
    squares[appleIndex].classList.add("apple");
  }

  document.addEventListener("keyup", controlSnake);
  startResetButton.addEventListener("click", startResetGame);
});
