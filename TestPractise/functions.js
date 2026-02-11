// 1. capitalize function
const capitalize = (string) => {
    if (typeof string !== 'string' || string.length === 0) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  // 2. reverseString function
  const reverseString = (string) => {
    if (typeof string !== 'string') return '';
    return string.split('').reverse().join('');
  };
  
  // 3. calculator object
  const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    divide: (a, b) => a / b,
    multiply: (a, b) => a * b,
  };
  
  // 4. caesarCipher helper: handles shifting a single character
  const shiftChar = (char, shiftFactor) => {
    const code = char.charCodeAt(0);
    let start;
  
    // Check for uppercase letters (ASCII 65-90)
    if (code >= 65 && code <= 90) {
      start = 65;
    }
    // Check for lowercase letters (ASCII 97-122)
    else if (code >= 97 && code <= 122) {
      start = 97;
    }
    // If not a letter, return the character unchanged
    else {
      return char;
    }
  
    // Formula for wrapping:
    // (current_code - start_code + shift) % 26 + start_code
    const newCode = ((code - start + shiftFactor) % 26) + start;
    return String.fromCharCode(newCode);
  };
  
  // 4. caesarCipher function
  const caesarCipher = (string, shiftFactor) => {
    if (typeof string !== 'string' || shiftFactor == null) return string;
    // Normalize shift factor to be between 0 and 25
    const normalizedShift = (shiftFactor % 26 + 26) % 26; 
  
    return string
      .split('')
      .map((char) => shiftChar(char, normalizedShift))
      .join('');
  };
  
  // 5. analyzeArray function
  const analyzeArray = (array) => {
    // Handle empty or invalid input
    if (!Array.isArray(array) || array.length === 0) {
      return { average: NaN, min: NaN, max: NaN, length: 0 };
    }
  
    const length = array.length;
    // Use a simple loop or reduce for a clean sum calculation
    const sum = array.reduce((acc, current) => acc + current, 0);
    const average = sum / length;
    
    // Math.min and Math.max work directly with array spread
    const min = Math.min(...array);
    const max = Math.max(...array);
  
    return { average, min, max, length };
  };
  
  // Export all functions for Jest to import
  export { capitalize, reverseString, calculator, caesarCipher, analyzeArray };