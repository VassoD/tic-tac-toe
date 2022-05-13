(function gameBoard() {
  let totalHistory = [];
  let playerHistory = [];
  let compHistory = [];
  let square = document.querySelectorAll(".square");

  let playerChoice = () => {
    square.forEach((el, i) => {
      el.addEventListener("click", () => {
        totalHistory.push(i);
        // To avoid clicking the same square twice
        el.classList.add("disableClick");
        el.textContent = "X";
        playerHistory.push(+el.id);
        // To stop game after result
        if (!checkWinner(playerHistory, "Human")) {
          compChoice();
        }
      });
    });
  };
  let compChoice = () => {
    let randomNum = Math.floor(Math.random() * 9);
    if (totalHistory.length <= 8) {
      // To add new unique no. to array
      if (!totalHistory.includes(randomNum)) {
        totalHistory.push(randomNum);
        square[randomNum].classList.add("disableClick");
        square[randomNum].textContent = "O";
        compHistory.push(+square[randomNum].id);
      } else {
        compChoice();
      }
    } else {
      document.getElementById("result").innerText = "It's a tie";
    }
    checkWinner(compHistory, "Computer");
  };

  playerChoice();
})();

let checkWinner = (arr, str) => {
  // Magic square
  for (i = 0; i < arr.length; i++) {
    for (j = i + 1; j < arr.length; j++) {
      for (k = j + 1; k < arr.length; k++) {
        if (arr[i] + arr[j] + arr[k] === 15) {
          return resultString(str);
        }
      }
    }
  }
};

let restart = document.getElementById("restart");
restart.addEventListener("click", function () {
  window.location.reload();
});

let resultString = (str) => {
  document.getElementById("container").classList.add("disableClick");
  let result = document.getElementById("result");
  result.classList.add("fade");
  if (str === "Human") {
    restart.classList.add("visible");
    result.innerText = "You won! 😄";
  } else if (str === "Computer") {
    result.innerText = "Sorry but your computer have won 🤷 Try again!";
    restart.classList.add("visible");
  }
  return true;
};