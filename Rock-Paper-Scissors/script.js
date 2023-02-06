"use strict"
function getComputerChoice() {
    /* returns a random choice of rock, paper , scissors*/
    let choice = ['rock', 'paper', 'scissors'];

    let randomChoice = Math.floor(Math.random() * choice.length);
    return (choice[randomChoice]);

}


function case_insensitive(playersChoice) {
    /* makes user input case insensitive */
    const input = playersChoice.toLowerCase();

    return input;
}
/*
function playRound() {
    /* plays a single round of rock, paper, scissors */

/*  const playersInput = prompt("Enter your Choice: ");
  let playerSelection = case_insensitive(playersInput);
  const computerSelection = getComputerChoice();

  console.log(computerSelection);
  console.log(playerSelection);

  if(playerSelection === computerSelection){
     return "it's a tie";
  }
  else{
      if(playerSelection === 'rock' ){
          if(computerSelection === 'paper'){
              return "paper cover rock, you lose";
          }
          else{
              return "rock beats scissors, you win!";
          }
      }
      else if(playerSelection === 'paper'){
          if(computerSelection  === 'scissors'){
              return "scissors cuts paper, you lose";
          }
          else{
              return "paper cover rock, you win";
          }
      }
      else if(playerSelection === 'scissors'){
          if(computerSelection  === 'rock'){
              return "rock beats scissors , you lose";
          }
          else{
             return "scissors cuts paper, you win! ";
          }
      }
      else{
          return "Invalid input";
      }
  }
  
 
}
*/

var playerScore = 0;
var computerScore = 0;
function playRound() {
    /* plays a single round of rock, paper, scissors */


    const playersInput = prompt("Enter your Choice: ");
    let playerSelection = case_insensitive(playersInput);
    const computerSelection = getComputerChoice();

    console.log("Computer Choice: " + computerSelection);
    console.log("Your Choice: " + playerSelection);

    if (playerSelection === computerSelection) {
        console.log("it's a tie");
    }
    else {
        if (playerSelection === 'rock') {
            if (computerSelection === 'paper') {
                console.log("papers cover rock");
                return computerScore++;
            }
            else {
                console.log("rock beats scissors");
                return playerScore++;
            }
        }
        else if (playerSelection === 'paper') {
            if (computerSelection === 'scissors') {
                console.log("scissors cuts paper");
                return computerScore++;
            }
            else {
                console.log("paper covers rock");
                return playerScore++;
            }
        }
        else if (playerSelection === 'scissors') {
            if (computerSelection === 'rock') {
                console.log("rock beats scissors");
                return computerScore++;
            }
            else {
                console.log("scissors cuts paper");
                return playerScore++;
            }
        }
        else {
            console.log("Invalid input");
        }
    }


}


function game() {

    for (let i = 0; i < 5; i++) {
        playRound(i);
        /* console.log(n);*/
    }
    console.log("Computer Score: " + computerScore);
    console.log("Your Score: " + playerScore);
    if(computerScore == playerScore){
        console.log("it's a tie");
        
    }
    else if(computerScore > playerScore){
        console.log("Computer wins!");
    }
    else{
        console.log("You win!");
    }

}

game();

