// gameboard.js
import { Ship } from './ship.js';

/**
 * Represents the 10x10 Gameboard where ships are placed and attacked.
 */
class Gameboard {
    constructor(size = 10) {
        this.size = size;
        // The grid holds references to Ship objects or null (water)
        this.grid = Array(size).fill(null).map(() => Array(size).fill(null));
        // Stores coordinates of missed attacks as strings "x,y"
        this.missedAttacks = new Set();
        this.ships = []; // Array of all Ship objects on the board
        // Stores coordinates of successful hits on ships as strings "x,y"
        this.successfulHits = new Set();
    }

    /**
     * Places a ship at a starting coordinate (x, y) with a given orientation.
     * @param {number} x - The starting x-coordinate (column).
     * @param {number} y - The starting y-coordinate (row).
     * @param {number} length - The length of the ship.
     * @param {('horizontal'|'vertical')} orientation - The ship's orientation.
     * @returns {boolean} True if placement was successful, false otherwise.
     */
    placeShip(x, y, length, orientation) {
        // 1. Create the ship
        const newShip = new Ship(length);
        const coordinates = [];

        // 2. Determine and validate coordinates
        for (let i = 0; i < length; i++) {
            let currX = x;
            let currY = y;

            if (orientation === 'horizontal') {
                currX += i;
            } else if (orientation === 'vertical') {
                currY += i;
            }

            // Check if coordinates are within bounds (0 to size-1)
            if (currX < 0 || currX >= this.size || currY < 0 || currY >= this.size) {
                return false; // Out of bounds
            }
            // Check for collision with existing ships
            if (this.grid[currY][currX] !== null) {
                return false; // Collision
            }
            coordinates.push({ x: currX, y: currY });
        }

        // 3. Place the ship on the grid
        for (const coord of coordinates) {
            this.grid[coord.y][coord.x] = newShip;
        }

        this.ships.push(newShip);
        return true;
    }

    /**
     * Receives an attack at the specified coordinates.
     * @param {number} x - The x-coordinate (column).
     * @param {number} y - The y-coordinate (row).
     * @returns {('hit'|'miss'|'repeated'|'invalid')} Attack result.
     */
    receiveAttack(x, y) {
        // 1. Validate coordinates
        if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
            return 'invalid';
        }
        
        const coordKey = `${x},${y}`;
        
        // 2. Check for repeated attack
        if (this.missedAttacks.has(coordKey) || this.successfulHits.has(coordKey)) {
            return 'repeated';
        }

        const target = this.grid[y][x];

        // 3. Check if it hit a ship
        if (target instanceof Ship) {
            target.hit();
            this.successfulHits.add(coordKey);
            return 'hit';
        } else {
            // 4. Missed attack
            this.missedAttacks.add(coordKey);
            return 'miss';
        }
    }
    
    /**
     * Checks if all ships on the board have been sunk.
     * @returns {boolean} True if all ships are sunk, false otherwise.
     */
    allShipsSunk() {
        if (this.ships.length === 0) return false; 
        return this.ships.every(ship => ship.isSunk());
    }
}

export { Gameboard };