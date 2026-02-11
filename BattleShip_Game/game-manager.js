import { Player } from "./player.js";
import { renderBoard, updateStatus } from "./dom-manager.js";

let playerOne;
let playerTwo; // The Computer
let currentPlayer;
let gameOver = false;

const SHIPS_TO_PLACE = [5, 4, 3, 3, 2];
const SHIP_NAMES = [
  "Carrier",
  "Battleship",
  "Destroyer",
  "Submarine",
  "Patrol Boat",
];
let shipsToPlaceIndex = 0;
let currentOrientation = "horizontal";
let isPlacementMode = true;

const playerOneBoardEl = document.getElementById("player-one-board");
const playerTwoBoardEl = document.getElementById("player-two-board");
const placementControlsEl = document.getElementById("placement-controls");

function placeComputerShips(board) {
  // Random ship placement for the computer
  board.placeShip(0, 0, 5, "horizontal");
  board.placeShip(0, 2, 4, "vertical");
  board.placeShip(5, 5, 3, "horizontal");
  board.placeShip(8, 0, 3, "vertical");
  board.placeShip(2, 8, 2, "horizontal");
}

function setupGame() {
  // 1. Create Players
  playerOne = new Player("Human Player", false);
  playerTwo = new Player("Computer", true);

  // 2. Place Computer Ships
  placeComputerShips(playerTwo.gameboard);

  // 3. Start Placement Mode
  isPlacementMode = true;
  shipsToPlaceIndex = 0;
  currentOrientation = "horizontal";
  placementControlsEl.style.display = "block";

  updateStatus(
    `Place your **${SHIP_NAMES[0]}** (Length: ${SHIPS_TO_PLACE[0]}). Click on **Your Board** to place.`
  );
  document.getElementById("orientation-display").textContent =
    currentOrientation.toUpperCase();

  renderBoards();
}

function toggleOrientation() {
  currentOrientation =
    currentOrientation === "horizontal" ? "vertical" : "horizontal";
  document.getElementById("orientation-display").textContent =
    currentOrientation.toUpperCase();
}

function handlePlacementClick(event) {
  if (!isPlacementMode) return;

  const cell = event.target;
  if (
    !cell.classList.contains("cell") ||
    cell.parentElement !== playerOneBoardEl
  ) {
    return;
  }

  const x = parseInt(cell.dataset.x, 10);
  const y = parseInt(cell.dataset.y, 10);
  const length = SHIPS_TO_PLACE[shipsToPlaceIndex];

  const success = playerOne.gameboard.placeShip(
    x,
    y,
    length,
    currentOrientation
  );

  if (success) {
    shipsToPlaceIndex++;
    renderBoards();

    if (shipsToPlaceIndex < SHIPS_TO_PLACE.length) {
      updateStatus(
        `Place your **${SHIP_NAMES[shipsToPlaceIndex]}** (Length: ${SHIPS_TO_PLACE[shipsToPlaceIndex]}).`
      );
    } else {
      isPlacementMode = false;
      placementControlsEl.style.display = "none";
      currentPlayer = playerOne;
      updateStatus(
        `All ships placed! Game Start! **${currentPlayer.name}'s** turn. Click on the **Enemy Board** to attack.`
      );

      playerOneBoardEl.removeEventListener("click", handlePlacementClick);
      playerTwoBoardEl.addEventListener("click", handleHumanPlay);
    }
  } else {
    updateStatus(
      "Invalid placement: Ship is out of bounds or overlapping. **Try a different spot.**"
    );
  }
}

// --- Game Logic ---

function checkGameOver() {
  if (playerTwo.gameboard.allShipsSunk()) {
    gameOver = true;
    updateStatus(`🎉 **${playerOne.name} WINS!** All Computer ships sunk.`);
  } else if (playerOne.gameboard.allShipsSunk()) {
    gameOver = true;
    updateStatus(`😢 **Computer WINS!** All ${playerOne.name}'s ships sunk.`);
  }
  return gameOver;
}

function switchTurn() {
  if (checkGameOver()) return;

  // Switch player
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  updateStatus(`**${currentPlayer.name}'s** turn.`);

  if (currentPlayer.isComputer) {
    setTimeout(handleComputerPlay, 1000);
  }
}

function handleHumanPlay(event) {
  if (gameOver || currentPlayer !== playerOne) return;

  const cell = event.target;
  if (
    !cell.classList.contains("cell") ||
    cell.parentElement !== playerTwoBoardEl
  ) {
    return;
  }

  const x = parseInt(cell.dataset.x, 10);
  const y = parseInt(cell.dataset.y, 10);

  const result = playerOne.attack(x, y, playerTwo.gameboard);

  if (result === "repeated") {
    updateStatus("You already attacked that spot! **Try again.**");
    return;
  }

  // Update display
  renderBoards();

  if (result === "hit") {
    const hitShip = playerTwo.gameboard.grid[y][x];
    let message = `**${playerOne.name}** HITS!`;
    if (hitShip.isSunk()) {
      message = `**${playerOne.name}** **SUNK** the ${
        SHIP_NAMES[SHIPS_TO_PLACE.indexOf(hitShip.length)]
      }!`;
    }
    updateStatus(message);
  }

  // Always switch turn after a valid move (hit or miss)
  setTimeout(switchTurn, 1000);
}

function handleComputerPlay() {
  if (gameOver || currentPlayer !== playerTwo) return;

  let move;
  let result;

  do {
    move = playerTwo.makeRandomPlay(playerOne.gameboard);

    if (move === null) {
      console.error("Computer has run out of moves!");
      gameOver = true;
      updateStatus("Game ended unexpectedly.");
      return;
    }

    result = playerTwo.attack(move.x, move.y, playerOne.gameboard);
  } while (result === "repeated");

  if (result === "hit") {
    const hitShip = playerOne.gameboard.grid[move.y][move.x];

    playerTwo.targets.push({
      x: move.x,
      y: move.y,
    });

    let message = `Computer attacked (${move.x},${move.y}) and **HIT**!`;
    if (hitShip.isSunk()) {
      message = `Computer **SUNK** your ${
        SHIP_NAMES[SHIPS_TO_PLACE.indexOf(hitShip.length)]
      }!`;
    }
    updateStatus(message);
  } else {
    updateStatus(
      `Computer attacked (${move.x},${
        move.y
      }). Result: **${result.toUpperCase()}**.`
    );
  }

  renderBoards();

  setTimeout(switchTurn, 1000);
}

function renderBoards() {
  // Player One (Human): Show ships (isPlayerBoard=true)
  renderBoard(playerOne.gameboard, playerOneBoardEl, true);
  // Player Two (Computer): Hide ships (isPlayerBoard=false), this is the target board
  renderBoard(playerTwo.gameboard, playerTwoBoardEl, false);
}

function addEventListeners() {
  // Listener for placement mode (always active on startup)
  playerOneBoardEl.addEventListener("click", handlePlacementClick);

  // Listener for the orientation button
  const orientationButton = document.getElementById("toggle-orientation");
  if (orientationButton) {
    orientationButton.addEventListener("click", toggleOrientation);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (playerOneBoardEl && playerTwoBoardEl && placementControlsEl) {
    setupGame();
    addEventListeners();
  } else {
    console.error("Missing required DOM elements. Check your HTML.");
  }
});
