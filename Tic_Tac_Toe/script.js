// Gameboard module using IIFE (module pattern)
const Gameboard = (() => {
  let board = Array(9).fill("");

  const getBoard = () => board;

  const makeMove = (index, marker) => {
    if (index >= 0 && index < 9 && board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = Array(9).fill("");
  };

  const isBoardFull = () => {
    return board.every((cell) => cell !== "");
  };

  return {
    getBoard,
    makeMove,
    resetBoard,
    isBoardFull,
  };
})();

// Player factory function
const Player = (name, marker) => {
  return {
    name,
    marker,
  };
};

// Game controller module using IIFE (module pattern)
const GameController = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const startNewGame = (player1Name, player2Name) => {
    players = [Player(player1Name, "X"), Player(player2Name, "O")];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.resetBoard();
  };

  const getCurrentPlayer = () => {
    return players[currentPlayerIndex];
  };

  const playRound = (cellIndex) => {
    if (gameOver) return false;

    const currentPlayer = getCurrentPlayer();
    if (Gameboard.makeMove(cellIndex, currentPlayer.marker)) {
      // Check for win or tie
      if (checkWinner(Gameboard.getBoard(), currentPlayer.marker)) {
        gameOver = true;
        return { type: "win", winner: currentPlayer };
      } else if (Gameboard.isBoardFull()) {
        gameOver = true;
        return { type: "tie" };
      }

      // Switch players
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
      return { type: "continue" };
    }
    return false;
  };

  const checkWinner = (board, marker) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    return winPatterns.some((pattern) => {
      return pattern.every((index) => board[index] === marker);
    });
  };

  const isGameOver = () => gameOver;

  return {
    startNewGame,
    getCurrentPlayer,
    playRound,
    isGameOver,
    checkWinner,
  };
})();

// Display controller module using IIFE (module pattern)
const DisplayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const statusDisplay = document.getElementById("status");
  const restartButton = document.getElementById("restart");
  const player1Input = document.getElementById("player1");
  const player2Input = document.getElementById("player2");

  const updateGameboard = () => {
    const board = Gameboard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      if (board[index] !== "") {
        cell.classList.add(board[index].toLowerCase());
      } else {
        cell.classList.remove("x", "o");
        cell.classList.remove("winning-cell");
      }
    });
  };

  const highlightWinningCells = (winPattern) => {
    winPattern.forEach((index) => {
      cells[index].classList.add("winning-cell");
    });
  };

  const handleCellClick = (e) => {
    const cellIndex = parseInt(e.target.dataset.index);

    const result = GameController.playRound(cellIndex);
    if (result) {
      updateGameboard();

      if (result.type === "win") {
        setStatus(`${result.winner.name} wins!`, true);

        // Find and highlight winning cells
        const board = Gameboard.getBoard();
        const winPatterns = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        const winPattern = winPatterns.find((pattern) =>
          pattern.every((index) => board[index] === result.winner.marker)
        );

        if (winPattern) {
          highlightWinningCells(winPattern);
        }
      } else if (result.type === "tie") {
        setStatus("It's a tie!", true);
      } else {
        const currentPlayer = GameController.getCurrentPlayer();
        setStatus(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
      }
    }
  };

  const setStatus = (message, isGameOver = false) => {
    statusDisplay.textContent = message;
    if (isGameOver) {
      statusDisplay.classList.add("winner");
    } else {
      statusDisplay.classList.remove("winner");
    }
  };

  const handleRestart = () => {
    GameController.startNewGame(
      player1Input.value || "Player 1",
      player2Input.value || "Player 2"
    );
    updateGameboard();
    const currentPlayer = GameController.getCurrentPlayer();
    setStatus(`${currentPlayer.name}'s turn (${currentPlayer.marker})`);
  };

  const bindEvents = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });

    restartButton.addEventListener("click", handleRestart);
  };

  const init = () => {
    bindEvents();
    GameController.startNewGame(
      player1Input.value || "Player 1",
      player2Input.value || "Player 2"
    );
    updateGameboard();
  };

  return {
    init,
  };
})();

// Initialize the game when the DOM is loaded
document.addEventListener("DOMContentLoaded", DisplayController.init);
