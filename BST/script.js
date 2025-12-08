/**
 * Merged Balanced Binary Search Tree (BST) Implementation and Driver Script.
 */

// --- 1. Node Class ---

class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  // --- 2. buildTree Helper Function ---
  
  const buildTree = (array, start = 0, end = array.length - 1) => {
    if (start > end) return null;
  
    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);
  
    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);
  
    return node;
  };
  
  // --- 3. Tree Class ---
  
  class Tree {
    constructor(array) {
      const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
      this.root = buildTree(uniqueSortedArray);
    }
  
    // Insertion
    insert(value, node = this.root) {
      if (node === null) {
        this.root = new Node(value);
        return this.root;
      }
  
      if (value === node.data) {
        console.log(`Value ${value} already exists. Skipping insertion.`);
        return node;
      }
  
      if (value < node.data) {
        if (node.left === null) {
          node.left = new Node(value);
          return node.left;
        }
        return this.insert(value, node.left);
      }
  
      if (value > node.data) {
        if (node.right === null) {
          node.right = new Node(value);
          return node.right;
        }
        return this.insert(value, node.right);
      }
    }
  
    // Deletion Helpers
    _minValueNode(node) {
      let current = node;
      while (current.left !== null) {
        current = current.left;
      }
      return current;
    }
  
    // Deletion
    deleteItem(value, node = this.root) {
      if (node === null) {
        return node;
      }
  
      if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
        return node;
      } else if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
        return node;
      }
  
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
  
      const temp = this._minValueNode(node.right);
      node.data = temp.data;
      node.right = this.deleteItem(temp.data, node.right);
  
      return node;
    }
  
    // Find
    find(value, node = this.root) {
      if (node === null || node.data === value) {
        return node;
      }
  
      if (value < node.data) {
        return this.find(value, node.left);
      }
  
      return this.find(value, node.right);
    }
  
    // Level Order Traversal (BFS)
    levelOrderForEach(callback) {
      if (typeof callback !== 'function') {
        throw new Error("A callback function is required for levelOrderForEach.");
      }
      if (this.root === null) return [];
  
      const queue = [this.root];
      const result = [];
  
      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);
        result.push(node.data);
  
        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }
      return result;
    }
  
    // Depth First Traversal (DFS) Helper
    _dfsTraversal(order, callback, node, result) {
      if (node === null) return;
  
      if (order === 'pre') callback(node);
      this._dfsTraversal(order, callback, node.left, result);
      if (order === 'in') callback(node);
      this._dfsTraversal(order, callback, node.right, result);
      if (order === 'post') callback(node);
      
      result.push(node.data); 
    }
  
    // In-Order Traversal
    inOrderForEach(callback) {
      if (typeof callback !== 'function') {
        throw new Error("A callback function is required for inOrderForEach.");
      }
      const result = [];
      this._dfsTraversal('in', callback, this.root, result);
      return result;
    }
  
    // Pre-Order Traversal
    preOrderForEach(callback) {
      if (typeof callback !== 'function') {
        throw new Error("A callback function is required for preOrderForEach.");
      }
      const result = [];
      this._dfsTraversal('pre', callback, this.root, result);
      return result;
    }
  
    // Post-Order Traversal
    postOrderForEach(callback) {
      if (typeof callback !== 'function') {
        throw new Error("A callback function is required for postOrderForEach.");
      }
      const result = [];
      this._dfsTraversal('post', callback, this.root, result);
      return result;
    }
  
    // Height Helper
    _nodeHeight(node) {
      if (node === null) {
        return -1;
      }
      return 1 + Math.max(this._nodeHeight(node.left), this._nodeHeight(node.right));
    }
  
    // Height
    height(value) {
      const targetNode = this.find(value);
      if (targetNode === null) {
        return null;
      }
      return this._nodeHeight(targetNode);
    }
  
    // Depth
    depth(value) {
      let current = this.root;
      let depth = 0;
  
      while (current !== null) {
        if (value === current.data) {
          return depth;
        } else if (value < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
        depth++;
      }
  
      return null;
    }
  
    // Check Balance
    isBalanced(node = this.root) {
      if (node === null) return true;
  
      const leftHeight = this._nodeHeight(node.left);
      const rightHeight = this._nodeHeight(node.right);
      const heightDifference = Math.abs(leftHeight - rightHeight);
  
      const isNodeBalanced = heightDifference <= 1;
      const isLeftSubtreeBalanced = this.isBalanced(node.left);
      const isRightSubtreeBalanced = this.isBalanced(node.right);
  
      return isNodeBalanced && isLeftSubtreeBalanced && isRightSubtreeBalanced;
    }
  
    // Rebalance
    rebalance() {
      const sortedArray = this.inOrderForEach(() => {}); 
      this.root = buildTree(sortedArray);
    }
  }
  
  // --- 4. Pretty Print Utility ---
  
  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };
  
  // --- 5. Driver Script ---
  
  const generateRandomArray = (size, max = 100) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
  };
  
  console.log("--- STARTING DRIVER SCRIPT ---");
  
  const randomArray = generateRandomArray(15);
  console.log(`\nInitial Array: [${randomArray.join(', ')}]`);
  const bst = new Tree(randomArray);
  
  console.log("\n## Initial Balanced Tree");
  prettyPrint(bst.root);
  
  console.log(`\n✅ Is the tree balanced? ${bst.isBalanced()}`);
  
  const printNodeData = (node) => { /* node.data */ };
  
  console.log("\n## Traversal Orders");
  console.log(`Level Order: [${bst.levelOrderForEach(printNodeData).join(', ')}]`);
  console.log(`In Order:    [${bst.inOrderForEach(printNodeData).join(', ')}]`);
  console.log(`Pre Order:   [${bst.preOrderForEach(printNodeData).join(', ')}]`);
  console.log(`Post Order:  [${bst.postOrderForEach(printNodeData).join(', ')}]`);
  
  console.log("\n--- UNBALANCING THE TREE ---");
  bst.insert(101);
  bst.insert(102);
  bst.insert(103);
  bst.insert(104);
  console.log("Inserted 101, 102, 103, 104.");
  
  console.log("\n## Unbalanced Tree");
  prettyPrint(bst.root);
  console.log(`\n❌ Is the tree balanced? ${bst.isBalanced()}`);
  
  console.log("\n--- REBALANCING THE TREE ---");
  bst.rebalance();
  
  console.log("\n## Rebalanced Tree");
  prettyPrint(bst.root);
  console.log(`\n✅ Is the tree balanced? ${bst.isBalanced()}`);
  
  console.log("\n## Traversal Orders After Rebalance");
  console.log(`Level Order: [${bst.levelOrderForEach(printNodeData).join(', ')}]`);
  console.log(`In Order:    [${bst.inOrderForEach(printNodeData).join(', ')}]`);
  console.log(`Pre Order:   [${bst.preOrderForEach(printNodeData).join(', ')}]`);
  console.log(`Post Order:  [${bst.postOrderForEach(printNodeData).join(', ')}]`);
  
  console.log("\n--- END OF DRIVER SCRIPT ---");