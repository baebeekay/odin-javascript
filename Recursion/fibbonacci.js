/**
 * Project: Fibonacci Sequence Algorithms
 * Description: Implements the Fibonacci sequence using both iterative and recursive methods.
 */



/**
 * Calculates the Fibonacci sequence up to 'n' numbers using iteration.
 * The sequence starts with 0 and 1.
 * @param {number} n The number of Fibonacci numbers to return (must be >= 0).
 * @returns {number[]} An array containing the first n Fibonacci numbers.
 */
const fibs = (n) => {
    // Handle base cases for n=0 and n=1
    if (n <= 0) {
        return [];
    }
    if (n === 1) {
        return [0];
    }

    // Initialize the array with the first two numbers
    const result = [0, 1];

    // Iterate up to n - 2 times, as we already have the first two elements
    for (let i = 2; i < n; i++) {
        const nextFib = result[i - 1] + result[i - 2];
        result.push(nextFib);
    }

    return result;
};



/**
 * Calculates the Fibonacci sequence up to 'n' numbers using recursion (accumulator pattern).
 *
 * @param {number} n The number of Fibonacci numbers to return.
 * @param {number[]} result The accumulator array, initialized to [0, 1].
 * @returns {number[]} An array containing the first n Fibonacci numbers.
 */
const fibsRec = (n, result = [0, 1]) => {
    // This logging is specifically requested to observe the recursive calls
    console.log("This was printed recursively");

    // Handle base cases (stopping conditions)
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return result;

    // Check if the array is already complete (length reaches n)
    if (result.length >= n) {
        return result;
    }

    // Calculate the next Fibonacci number
    const nextFib = result[result.length - 1] + result[result.length - 2];

    // Add the new number and make the recursive call
    result.push(nextFib);

    return fibsRec(n, result);
};

// --- Test Fibonacci Functions ---

console.log("--- Testing Fibonacci Functions ---");

// Test cases (n=8 expected: [0, 1, 1, 2, 3, 5, 8, 13])
const n = 8;

console.log(`\nFibs (Iterative) for n=${n}:`);
console.log(fibs(n));

console.log(`\nFibsRec (Recursive) for n=${n} (Watch the 'printed recursively' logs):`);

console.log(fibsRec(n));

// Other tests
console.log(`\nFibs (Iterative) for n=1: ${fibs(1)}`); 
console.log(`FibsRec (Recursive) for n=4: ${fibsRec(4)}`); 
console.log(`FibsRec (Recursive) for n=0: ${fibsRec(0)}`); 