// Get all the necessary DOM elements
const firstNumberDisplay = document.querySelector(".first-number");
const secondNumberDisplay = document.querySelector(".second-number");
const operatorContainer = document.querySelector(".operatordiv");
const clearButton = document.querySelector(".keys:last-of-type .numbers"); // Targeted the "Clear" button more specifically
const deleteButton = document.querySelector(".keys:last-of-type button:nth-of-type(1)"); // Targeted the "Del" button
const equalsButton = document.querySelector(".keys .d"); // Targeted the "=" button

// State variables to keep track of the calculator's current state
let currentNumber = '0';
let currentOperator = null;
let savedNumber = null;
let shouldClearScreen = false;

// Function to reset the calculator to its initial state
function resetCalculator() {
  currentNumber = '0';
  currentOperator = null;
  savedNumber = null;
  shouldClearScreen = false;
  firstNumberDisplay.textContent = '';
  secondNumberDisplay.textContent = '';
  operatorContainer.textContent = '';
}

// Function to update the screen display
function updateDisplay() {
  if (savedNumber !== null) {
    firstNumberDisplay.textContent = savedNumber;
  }
  if (currentOperator !== null) {
    operatorContainer.textContent = currentOperator;
  }
  secondNumberDisplay.textContent = currentNumber;
}

// --- Event Listeners ---

// Event listener for all number and period buttons
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Handle number inputs
    if (!isNaN(value) || value === '.') {
      // Prevent multiple decimals
      if (value === '.' && currentNumber.includes('.')) {
        return;
      }
      
      // If the display needs to be cleared or the current number is '0', start a new number
      if (shouldClearScreen) {
        currentNumber = value === '.' ? '0.' : value;
        shouldClearScreen = false;
      } else {
        // Append the new number, handling the initial '0' case
        if (currentNumber === '0' && value !== '.') {
          currentNumber = value;
        } else {
          currentNumber += value;
        }
      }
      updateDisplay();
    }
  });
});

// Event listener for operator buttons
const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    // If there's already a saved number and an operator, calculate the result first
    if (savedNumber !== null && currentOperator !== null) {
      const result = operate(currentOperator, parseFloat(savedNumber), parseFloat(currentNumber));
      savedNumber = result;
    } else {
      savedNumber = currentNumber;
    }
    
    currentNumber = '0'; // Reset the current number for the new input
    currentOperator = button.textContent;
    shouldClearScreen = true; // Clear the screen on the next number input
    updateDisplay();
  });
});

// Event listener for the equals button
equalsButton.addEventListener("click", () => {
  if (currentOperator !== null && savedNumber !== null) {
    const result = operate(currentOperator, parseFloat(savedNumber), parseFloat(currentNumber));
    
    // Check for division by zero error
    if (result === 'Error') {
      currentNumber = 'Error';
    } else {
      currentNumber = result.toString();
    }
    
    firstNumberDisplay.textContent = ''; // Clear the previous expression from the screen
    operatorContainer.textContent = '';
    savedNumber = null;
    currentOperator = null;
    shouldClearScreen = true; // Ready for a new calculation
    updateDisplay();
  }
});

// Event listener for the clear button
clearButton.addEventListener("click", () => {
  resetCalculator();
  updateDisplay();
});

// Event listener for the delete button
deleteButton.addEventListener("click", () => {
  currentNumber = currentNumber.slice(0, -1);
  if (currentNumber === '') {
    currentNumber = '0';
  }
  updateDisplay();
});

// --- Arithmetic Functions ---

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return null;
  }
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'Error'; // Return a string to indicate an error
  }
  return a / b;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}


function sum(array) {
  return array.reduce((total, current) => total + current, 0);
}

const mul = function (array) {
  return array.reduce((product, current) => product * current)
};

const power = function (a, b) {
  return Math.pow(a, b);
};

const factorial = function (n) {
  if (n === 0) return 1;
  let product = 1;
  for (let i = n; i > 0; i--) {
    product *= i;
  }
  return product;
};