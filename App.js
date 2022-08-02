
const tiles = Array.from(document.querySelectorAll(".tile"));
const playderDisplay = document.querySelector(".display-player");
const resetButton = document.querySelector("#reset");
const announcer = document.querySelector(".announcer");

const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const playerXWon = "PLAYER X WON!!";
const playerOWon = "PLAYER O WON!!";
const tie = "TIE :(";

const winnningCombition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function updateBoard(index) {
  board[index] = currentPlayer;
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winnningCombition[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    announce(currentPlayer === "X" ? playerXWon : playerOWon);
    isGameActive = false;
    return;
  }
  if (!board.includes("")) {
    announce(tie);
  }
}

function announce(type) {
  switch (type) {
    case playerXWon:
      announcer.innerHTML = `Player <span class="playerX">X</span> Won`;
      break;
    case playerOWon:
      announcer.innerHTML = `Player <span class="playerO">O</span> Won`;
      break;
    case tie:
      announcer.innerHTML = "Tie";
  }
  announcer.classList.remove("hide");
}

function changePlayer() {
  playderDisplay.classList.remove(`player${currentPlayer}`);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playderDisplay.innerHTML = currentPlayer;
  playderDisplay.classList.add(`player${currentPlayer}`);
}

function userAction(tile, index) {
  if (isValidAction(tile) && isGameActive) {
    tile.innerText = currentPlayer;
    tile.classList.add(`player${currentPlayer}`);
    updateBoard(index);
    handleResultValidation();
    changePlayer();
  }
}

function resetBoard() {
  const board = ["", "", "", "", "", "", "", "", ""];
  let isGameActive = true;
  announcer.classList.add("hide");

  if (currentPlayer === "O") {
    changePlayer();
  }
  tiles.forEach((tile) => {
    tile.innerHTML = "";
    tile.classList.remove("playerX");
    tile.classList.remove("playerO");
  });
}

function isValidAction(tile) {
  if (tile.innerText === "X" || tile.innerText === "O") {
    return false;
  }

  return true;
}

tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => {
    userAction(tile, index);
  });
});

resetButton.addEventListener("click", resetBoard);
