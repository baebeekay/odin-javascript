/**
 * Represents a single ship in the game of Battleship.
 */
class Ship {
  /**
   * @param {number} length - The length of the ship.
   */
  constructor(length) {
    if (typeof length !== "number" || length <= 0) {
      throw new Error("Ship length must be a positive number.");
    }
    this.length = length;
    this.hits = 0;
  }

  /**
   * Records a hit on the ship.
   */
  hit() {
    if (!this.isSunk()) {
      this.hits += 1;
    }
  }

  /**
   * Checks if the ship is sunk (hits equals its length).
   * @returns {boolean} True if the ship is sunk, false otherwise.
   */
  isSunk() {
    return this.hits >= this.length;
  }
}

export { Ship };
