const button = document.querySelectorAll(".button");
let player_choice = document.querySelector(".player_choice");
const computer_choice = document.querySelector(".computer_choice");
let your_score = document.querySelector(".your_score");
let computer_score = document.querySelector(".computer_score");
const result = document.querySelector(".result");
const play_again = document.querySelector(".play_again");
const modal = document.querySelector(".modal");
const content = document.querySelector(".content");
const display = document.querySelector(".display");

var computerSelection;
var playerSelection;
("use strict");
function getComputerChoice() {
  /* returns a random choice of rock, paper , scissors*/
  let choice = ["ROCK", "PAPER", "SCISSORS"];

  let randomChoice = Math.floor(Math.random() * choice.length);
  return choice[randomChoice];
}

for (let i = 0; i < button.length; i++) {
  /* iterates through the the buttons */

  button[i].addEventListener("click", () => {
    playerSelection = button[i].textContent;
    player_choice.innerHTML = playerSelection;
    playRound();
  });
}

var playerScore = 0;
var computerScore = 0;
function playRound() {
  /* plays a single round of rock, paper, scissors */
  const computerSelection = getComputerChoice();
  computer_choice.innerHTML = computerSelection;

  if (playerSelection === computerSelection) {
    result.innerHTML = "it's a tie";
  } else {
    if (playerSelection === "ROCK") {
      if (computerSelection === "PAPER") {
        result.innerHTML = "papers cover rock";
        computerScore++;
        computer_score.innerHTML = computerScore;
      } else {
        result.innerHTML = "rock beats scissors";
        playerScore++;
        your_score.innerHTML = playerScore;
      }
    } else if (playerSelection === "PAPER") {
      if (computerSelection === "SCISSORS") {
        result.innerHTML = "scissors cuts paper";
        computerScore++;
        computer_score.innerHTML = computerScore;
      } else {
        result.innerHTML = "paper covers rock";
        playerScore++;
        your_score.innerHTML = playerScore;
      }
    } else if (playerSelection === "SCISSORS") {
      if (computerSelection === "ROCK") {
        result.innerHTML = "rock beats scissors";
        computerScore++;
        computer_score.innerHTML = computerScore;
      } else {
        result.innerHTML = "scissors cuts paper";
        playerScore++;
        your_score.innerHTML = playerScore;
      }
    } else {
      console.log("Invalid input");
    }
  }

  if (computerScore == 5 || playerScore == 5) {
    content.style.display = "none";
    modal.style.display = "block";
    if (computerScore == playerScore) {
      display.innerHTML = "it's a tie";
    } else if (computerScore > playerScore) {
      display.innerHTML = "Computer wins!";
    } else {
      display.innerHTML = "You win!";
    }
  }
}

play_again.addEventListener("click", () => {
  location.reload();
});
