document.addEventListener("DOMContentLoaded", function (params) {
  let currentIndex = 0;
  let direction = 1;
  // 2 is the head, 1- body, 0 -the tail of the snake
  let currentSnake = [2, 1, 0];
  let squares = document.querySelectorAll(".game-wrapper div");
  const width = 10;

  //Controlling the snake
  function moveSnake(e) {
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

  setInterval(() => {
    currentSnake.forEach((snakePart) => {
      squares[snakePart].classList.add("snake");
    });

    //  remove class snake of the tail

    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");

    //moving the snake forward , unshift 0 index of the snake plus direction of movement
    currentSnake.unshift(currentSnake[0] + direction);
    console.log(currentSnake);
    squares[currentSnake[0]].classList.add("snake");

    // eating apples

    if (squares[currentSnake[0]].classList.contains("apple")) {
      console.log(`ye`);
      squares[currentSnake[0]].classList.remove("apple");
      currentSnake.push(currentSnake[0]);
    }
  }, 500);
  document.addEventListener("keyup", moveSnake);
});

// let tail = currentSnake.pop();
//     currentSnake.unshift(currentSnake[0] + direction);
//     squares[tail].classList.remove("snake");
//     console.log(currentSnake);
