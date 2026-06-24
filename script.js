const boxes = document.querySelectorAll(".box");
const turnText = document.getElementById("turnText");

let currentPlayer = "X";
let gameActive = true;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

boxes.forEach((box, index) => {
  box.addEventListener("click", function () {
    playGame(box, index);
  });
});

function playGame(box, index) {
  if (box.innerText !== "" || gameActive === false) {
    return;
  }

  box.innerText = currentPlayer;

  if (currentPlayer === "X") {
    box.classList.add("x");
  } else {
    box.classList.add("o");
  }

  checkWinner();

  if (gameActive === true) {
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }

    turnText.innerText = "Player " + currentPlayer + " Turn";
  }
}

function checkWinner() {
  let winnerFound = false;

  for (let i = 0; i < winningPatterns.length; i++) {
    let pattern = winningPatterns[i];

    let first = boxes[pattern[0]].innerText;
    let second = boxes[pattern[1]].innerText;
    let third = boxes[pattern[2]].innerText;

    if (first !== "" && first === second && second === third) {
      winnerFound = true;

      boxes[pattern[0]].classList.add("winner");
      boxes[pattern[1]].classList.add("winner");
      boxes[pattern[2]].classList.add("winner");

      break;
    }
  }

  if (winnerFound === true) {
    turnText.innerText = "Player " + currentPlayer + " Wins!";

    if (currentPlayer === "X") {
      xScore++;
      document.getElementById("xScore").innerText = xScore;
    } else {
      oScore++;
      document.getElementById("oScore").innerText = oScore;
    }

    gameActive = false;
    return;
  }

  let isDraw = true;

  boxes.forEach(function (box) {
    if (box.innerText === "") {
      isDraw = false;
    }
  });

  if (isDraw === true) {
    turnText.innerText = "Game Draw!";

    drawScore++;
    document.getElementById("drawScore").innerText = drawScore;

    gameActive = false;
  }
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;

  turnText.innerText = "Player X Turn";

  boxes.forEach(function (box) {
    box.innerText = "";
    box.classList.remove("x");
    box.classList.remove("o");
    box.classList.remove("winner");
  });
}