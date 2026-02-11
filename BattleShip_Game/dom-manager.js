/**
 * Renders the player's gameboard on the DOM.
 * @param {Gameboard} board - The Gameboard object to render.
 * @param {HTMLElement} container - The DOM element to render the grid inside.
 * @param {boolean} isPlayerBoard - True for the human player's board (shows ships), False for enemy board (hides ships).
 */
function renderBoard(board, container, isPlayerBoard = false) {
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(${board.size}, 1fr)`;
  container.classList.add("gameboard-grid");

  // Set a data attribute to easily identify the board for event handling
  container.dataset.boardType = isPlayerBoard ? "player" : "enemy";

  for (let y = 0; y < board.size; y++) {
    for (let x = 0; x < board.size; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;

      const coordKey = `${x},${y}`;

      // Check for previous attacks
      if (board.missedAttacks.has(coordKey)) {
        cell.classList.add("miss");
      } else if (board.successfulHits.has(coordKey)) {
        cell.classList.add("hit");

        // Check if the ship is sunk
        if (board.grid[y][x] && board.grid[y][x].isSunk()) {
          cell.classList.add("sunk-ship");
        }
      }

      // Player's board (shows ship location)
      if (isPlayerBoard && board.grid[y][x] !== null) {
        cell.classList.add("ship-cell");
      }

      container.appendChild(cell);
    }
  }
}

/**
 * Updates the game status message.
 * @param {string} message - The message to display.
 */
function updateStatus(message) {
  const statusElement = document.getElementById("game-status");
  if (statusElement) {
    statusElement.innerHTML = message;
  }
}

export { renderBoard, updateStatus };
