#⚓ Battleship Game (Vanilla JavaScript)

This is a complete, two-player Battleship game built using vanilla JavaScript, following Test-Driven Development (TDD) principles for the core logic and an Object-Oriented Programming (OOP) approach using ES6 Classes. The game features a human player vs. an intelligent computer opponent.✨ Features
OOP Architecture: Clean separation of concerns using JavaScript classes (Ship, Gameboard, Player).
Manual Placement: The human player controls the placement of their five ships before the game begins.
Intelligent Computer AI: The computer makes random initial attacks but switches to a priority targeting mode (checking adjacent cells) upon scoring a hit to sink the ship faster.
Game State Management: Clear turn management, hit/miss tracking, and game over conditions.
Enhanced UI: Visually distinct boards and indicators for water, misses (•), hits (🔥), and sunk ships (💀).

###🛠️ Technology StackLanguage:
Vanilla JavaScript (ES6 Modules)
###🚀 Getting Started
To run the game, you only need a modern web browser.

###🕹️ How to Play

1. Placement Phase
   The game starts in Placement Mode. The status bar tells you which ship you are currently placing.Use the "Rotate Ship" button to toggle the orientation between HORIZONTAL and VERTICAL.Click on a starting coordinate on Your Board (Defense) to place the ship.If placement is invalid (out of bounds or overlapping), the game will notify you.Repeat until all 5 ships are placed (Lengths: 5, 4, 3, 3, 2).2.
2. Attack Phase
   The game will announce the start of the game and whose turn it is.During your turn, click on a coordinate on the Enemy Board (Attack) to launch an attack.The board will update immediately with: Gray Dot: Miss Red Fire Emoji (🔥): HitBlack Skull Emoji (💀): Sunk ShipThe turn switches to the Computer. The Computer will attack your board after a brief delay.The game ends when all ships belonging to either the Human Player or the Computer are sunk.
