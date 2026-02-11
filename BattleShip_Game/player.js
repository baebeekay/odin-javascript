// player.js
import { Gameboard } from './gameboard.js';

/**
 * Represents a player (human or computer) in the game.
 */
class Player {
    /**
     * @param {string} name - The name of the player (e.g., "Player One" or "Computer").
     * @param {boolean} isComputer - True if the player is a computer, false otherwise.
     */
    constructor(name, isComputer = false) {
        this.name = name;
        this.isComputer = isComputer;
        this.gameboard = new Gameboard();
        this.previousAttacks = new Set(); // Tracks all attempted attacks by this player
        
        // --- AI Enhancement: Stores coordinates of successful hits for the computer to follow up on ---
        // Format: [{x: 5, y: 5}]
        this.targets = []; 
    }

    /**
     * Executes an attack on the enemy's gameboard.
     * @param {number} x - The x-coordinate (column).
     * @param {number} y - The y-coordinate (row).
     * @param {Gameboard} enemyBoard - The enemy player's gameboard.
     * @returns {string} The result of the attack ('hit', 'miss', 'repeated', 'invalid').
     */
    attack(x, y, enemyBoard) {
        const coordKey = `${x},${y}`;
        
        // Check if this player has already attempted this attack
        if (this.previousAttacks.has(coordKey)) {
            return 'repeated'; 
        }

        const result = enemyBoard.receiveAttack(x, y);
        
        // Only mark valid attacks (hit or miss) as attempted
        if (result === 'hit' || result === 'miss') {
            this.previousAttacks.add(coordKey);
        }
        
        return result;
    }

    /**
     * Determines the next attack coordinate for the computer player.
     * Prioritizes adjacent shots to sink damaged ships.
     * @param {Gameboard} enemyBoard - The enemy player's gameboard.
     * @returns {{x: number, y: number}|null} An object with x and y coordinates, or null if no valid moves left.
     */
    makeRandomPlay(enemyBoard) {
        if (!this.isComputer) return null;

        // 1. Clean up targets list: Remove targets belonging to ships that are now sunk
        this.targets = this.targets.filter(
            // Check if the ship at this coordinate is still not sunk
            (target) => enemyBoard.grid[target.y][target.x] && !enemyBoard.grid[target.y][target.x].isSunk()
        );

        // 2. Prioritize targeted attacks
        while (this.targets.length > 0) {
            const currentTarget = this.targets[0]; // Start with the oldest hit
            
            // Define possible adjacent moves (North, East, South, West)
            const directions = [
                { dx: 0, dy: -1 }, { dx: 1, dy: 0 }, 
                { dx: 0, dy: 1 }, { dx: -1, dy: 0 }
            ];

            // Randomize directions to avoid always searching North first
            directions.sort(() => Math.random() - 0.5);

            for (const dir of directions) {
                const x = currentTarget.x + dir.dx;
                const y = currentTarget.y + dir.dy;
                const coordKey = `${x},${y}`;
                
                // Check if the coordinate is valid (within bounds and hasn't been attacked yet)
                if (
                    x >= 0 && x < enemyBoard.size && 
                    y >= 0 && y < enemyBoard.size && 
                    !this.previousAttacks.has(coordKey)
                ) {
                    return { x, y }; // Found a valid follow-up move
                }
            }

            // If we checked all adjacent spots and found no legal move, remove this target
            this.targets.shift();
        }

        // 3. Random Attack (Fallback)
        const size = enemyBoard.size;
        let x, y, coordKey;
        let attempts = 0;
        const maxAttempts = size * size;

        do {
            x = Math.floor(Math.random() * size);
            y = Math.floor(Math.random() * size);
            coordKey = `${x},${y}`;
            attempts++;
        } while (this.previousAttacks.has(coordKey) && attempts < maxAttempts);

        if (attempts >= maxAttempts) return null; 

        return { x, y };
    }
}

export { Player };