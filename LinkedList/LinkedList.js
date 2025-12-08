// LinkedList.js
import Node from "./Node.js";

class LinkedList {
  constructor() {
    this.headNode = null;
  }

  // --- Core Methods ---

  append(value) {
    const newNode = new Node(value);
    if (this.headNode === null) {
      this.headNode = newNode;
      return;
    }
    let current = this.headNode;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    current.nextNode = newNode;
  }

  prepend(value) {
    this.headNode = new Node(value, this.headNode);
  }

  get size() {
    let count = 0;
    let current = this.headNode;
    while (current !== null) {
      count++;
      current = current.nextNode;
    }
    return count;
  }

  get head() {
    return this.headNode;
  }

  get tail() {
    if (this.headNode === null) return null;

    let current = this.headNode;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    return current;
  }

  at(index) {
    if (index < 0 || this.headNode === null) return null;

    let current = this.headNode;
    let count = 0;
    while (current !== null) {
      if (count === index) {
        return current;
      }
      count++;
      current = current.nextNode;
    }
    return null;
  }

  pop() {
    if (this.headNode === null) return null;

    if (this.headNode.nextNode === null) {
      const poppedNode = this.headNode;
      this.headNode = null;
      return poppedNode;
    }

    let current = this.headNode;
    let prev = null;
    while (current.nextNode !== null) {
      prev = current;
      current = current.nextNode;
    }
    prev.nextNode = null;
    return current;
  }

  contains(value) {
    let current = this.headNode;
    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  find(value) {
    let current = this.headNode;
    let index = 0;
    while (current !== null) {
      if (current.value === value) {
        return index;
      }
      index++;
      current = current.nextNode;
    }
    return null;
  }

  toString() {
    let output = "";
    let current = this.headNode;
    while (current !== null) {
      output += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    output += "null";
    return output;
  }

  // --- Extra Credit Methods ---

  insertAt(value, index) {
    if (index < 0) return false;

    if (index === 0) {
      this.prepend(value);
      return true;
    }

    const prevNode = this.at(index - 1);

    if (prevNode === null) return false;

    const newNode = new Node(value, prevNode.nextNode);
    prevNode.nextNode = newNode;
    return true;
  }

  removeAt(index) {
    if (index < 0 || this.headNode === null) return null;

    if (index === 0) {
      const removedNode = this.headNode;
      this.headNode = this.headNode.nextNode;
      return removedNode;
    }

    const prevNode = this.at(index - 1);

    if (prevNode === null || prevNode.nextNode === null) return null;

    const removedNode = prevNode.nextNode;
    prevNode.nextNode = removedNode.nextNode;
    return removedNode;
  }
}

export default LinkedList;