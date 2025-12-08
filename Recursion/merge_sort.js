/**
 * Project: Merge Sort Algorithm
 * Description: Implements the recursive Merge Sort algorithm.
 */

/**
 * Merges two sorted arrays into a single sorted array.
 * @param {number[]} left The left sorted array.
 * @param {number[]} right The right sorted array.
 * @returns {number[]} The combined sorted array.
 */
const merge = (left, right) => {
    const mergedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements from both arrays and push the smaller one to the result
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            mergedArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            mergedArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Concatenate the remaining elements (one array will have leftovers)
    return mergedArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
};

/**
 * Sorts an array using the recursive Merge Sort algorithm.
 * The core concept of Merge Sort is Divide and Conquer.
 * 
 *
 * @param {number[]} array The array to be sorted.
 * @returns {number[]} The fully sorted array.
 */
const mergeSort = (array) => {
    // Base case: An array with 0 or 1 element is already sorted.
    if (array.length <= 1) {
        return array;
    }

    // 1. Divide: Find the middle point and split the array into two halves
    const middle = Math.floor(array.length / 2);
    const leftHalf = array.slice(0, middle);
    const rightHalf = array.slice(middle);

    // 2. Conquer: Recursively sort the two halves
    const sortedLeft = mergeSort(leftHalf);
    const sortedRight = mergeSort(rightHalf);

    // 3. Combine: Merge the sorted halves
    return merge(sortedLeft, sortedRight);
};

// --- Test Merge Sort Function ---

console.log("--- Testing Merge Sort Function ---");

const testCases = [
    [], 
    [73], 
    [1, 2, 3, 4, 5], 
    [3, 2, 1, 13, 8, 5, 0, 1], 
    [105, 79, 100, 110] 
];

testCases.forEach((testArray, index) => {
    console.log(`\nTest ${index + 1}:`);
    console.log(`Original: [${testArray}]`);
    console.log(`Sorted:   [${mergeSort(testArray)}]`);
});