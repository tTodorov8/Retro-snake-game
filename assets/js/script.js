document.addEventListener("DOMContentLoaded", function (params) {
  let currentIndex = 0;
  // let appleIndex = 0;
  let direction = 1;
  let score = 0;
  let speedTime = 300;

  // 2 is the head, 1- body, 0 -the tail of the snake
  let currentSnake = [2, 1, 0];
  let squares = document.querySelectorAll(".game-wrapper div");
  let startResetButton = document.querySelector(".start-reset-button");
  let displayScore = document.querySelector(".score");
  let gameInterval = 0;
  console.log(startResetButton);
  const width = 10;
  currentSnake.forEach((snakePart) => {
    squares[snakePart].classList.add("snake");
  });
  function startGame() {
    squares.forEach((square) => {
      square.classList.remove("snake");
      square.classList.remove("apple");
    });
    score = 0;

    displayScore.textContent = score;
    direction = 1;
    currentSnake = [2, 1, 0];
    appleIndex = 0;
    randomApple();
    clearInterval(gameInterval);

    gameInterval = setInterval(runTheGame, speedTime);
    console.log(speedTime);
  }

  function runTheGame() {
    //  remove class snake of the tail
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");

    //moving the snake forward , unshift 0 index of the snake plus direction of movement
    currentSnake.unshift(currentSnake[0] + direction);
    console.log(currentSnake);
    squares[currentSnake[0]].classList.add("snake");

    // eating apples

    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[currentSnake[0]].classList.add("snake");
      currentSnake.push(currentSnake[0]);

      score++;
      displayScore.textContent = score;
      randomApple();
    }
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

  function randomApple() {
    let appleIndex =
      squares[Math.floor(Math.random() * squares.length - 1)].classList.add(
        "apple"
      );
    console.log(appleIndex);
  }

  document.addEventListener("keyup", controlSnake);
  startResetButton.addEventListener("click", startGame);
});

// let tail = currentSnake.pop();
//     currentSnake.unshift(currentSnake[0] + direction);
//     squares[tail].classList.remove("snake");
//     console.log(currentSnake);
