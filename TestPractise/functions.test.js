import { 
    capitalize, 
    reverseString, 
    calculator, 
    caesarCipher, 
    analyzeArray 
  } from './functions.js';
  
  // Test suite for the capitalize function
  describe('capitalize', () => {
    test('should capitalize the first letter of a word', () => {
      expect(capitalize('hello')).toBe('Hello');
    });
  
    test('should return the same string if the first letter is already capitalized', () => {
      expect(capitalize('World')).toBe('World');
    });
  
    test('should handle an empty string', () => {
      expect(capitalize('')).toBe('');
    });
  
    test('should not alter the case of subsequent letters', () => {
      expect(capitalize('tEsTiNg')).toBe('TEsTiNg');
    });
  });
  
  // -----------------------------------------------------------------------------
  
  // Test suite for the reverseString function
  describe('reverseString', () => {
    test('should correctly reverse a basic string', () => {
      expect(reverseString('hello')).toBe('olleh');
    });
  
    test('should handle a single character string', () => {
      expect(reverseString('a')).toBe('a');
    });
  
    test('should return an empty string when given an empty string', () => {
      expect(reverseString('')).toBe('');
    });
  
    test('should handle strings with spaces and symbols', () => {
      expect(reverseString('Hello, World!')).toBe('!dlroW ,olleH');
    });
  });
  
  // -----------------------------------------------------------------------------
  
  // Test suite for the calculator object and its methods
  describe('calculator', () => {
    // Nested tests for each operation
    describe('add', () => {
      test('adds two positive numbers', () => {
        expect(calculator.add(1, 2)).toBe(3);
      });
      test('adds a positive and a negative number', () => {
        expect(calculator.add(10, -5)).toBe(5);
      });
    });
  
    describe('subtract', () => {
      test('subtracts two positive numbers', () => {
        expect(calculator.subtract(5, 2)).toBe(3);
      });
      test('handles negative results', () => {
        expect(calculator.subtract(5, 10)).toBe(-5);
      });
    });
  
    describe('divide', () => {
      test('divides two positive numbers', () => {
        expect(calculator.divide(10, 5)).toBe(2);
      });
      test('handles division that results in a float', () => {
        expect(calculator.divide(5, 2)).toBe(2.5);
      });
      test('handles division by zero', () => {
        expect(calculator.divide(5, 0)).toBe(Infinity);
      });
    });
  
    describe('multiply', () => {
      test('multiplies two positive numbers', () => {
        expect(calculator.multiply(3, 4)).toBe(12);
      });
      test('multiplies with zero', () => {
        expect(calculator.multiply(5, 0)).toBe(0);
      });
      test('multiplies a negative and a positive number', () => {
        expect(calculator.multiply(-3, 4)).toBe(-12);
      });
    });
  });
  
  // -----------------------------------------------------------------------------
  
  // Test suite for the caesarCipher function
  describe('caesarCipher', () => {
    test('should correctly shift all letters by the shift factor', () => {
      expect(caesarCipher('abc', 1)).toBe('bcd');
    });
  
    test('should correctly wrap from z to a', () => {
      // Example from the assignment: caesarCipher('xyz', 3) should return 'abc'
      expect(caesarCipher('xyz', 3)).toBe('abc');
    });
  
    test('should preserve case', () => {
      // Example from the assignment: caesarCipher('HeLLo', 3) should return 'KhOOr'
      expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
    });
  
    test('should preserve punctuation and spaces', () => {
      // Example from the assignment: caesarCipher('Hello, World!', 3) should return 'Khoor, Zruog!'
      expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
    });
    
    test('should handle a shift factor of 0', () => {
      expect(caesarCipher('Test', 0)).toBe('Test');
    });
  
    test('should handle a large shift factor (e.g., 29 = shift of 3)', () => {
      expect(caesarCipher('abc', 29)).toBe('bcd'); // 29 % 26 = 3
    });
  
    test('should handle negative shift factor (shifting backwards)', () => {
      expect(caesarCipher('bcd', -1)).toBe('abc');
    });
  });
  
  // -----------------------------------------------------------------------------
  
  // Test suite for the analyzeArray function
  describe('analyzeArray', () => {
    // Test case provided in the assignment
    test('should return the correct object for the example array', () => {
      const object = analyzeArray([1, 8, 3, 4, 2, 6]);
      expect(object).toEqual({
        average: 4,
        min: 1,
        max: 8,
        length: 6,
      });
    });
  
    test('should correctly analyze an array with a single element', () => {
      const object = analyzeArray([42]);
      expect(object).toEqual({
        average: 42,
        min: 42,
        max: 42,
        length: 1,
      });
    });
  
    test('should correctly analyze an array including negative numbers', () => {
      const object = analyzeArray([-1, -8, 3, 4, -2, 6]);
      // Sum: 2 / Length: 6 -> Average: 0.3333...
      expect(object.average).toBeCloseTo(0.3333, 4); 
      expect(object.min).toBe(-8);
      expect(object.max).toBe(6);
      expect(object.length).toBe(6);
    });
    
    test('should handle an empty array', () => {
      const object = analyzeArray([]);
      expect(object.average).toBeNaN();
      expect(object.min).toBeNaN();
      expect(object.max).toBeNaN();
      expect(object.length).toBe(0);
    });
  });