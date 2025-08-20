# Sort

A simple sorting function. Can be used for package sorting such as with a Thoughtful AI robotic automation factory. It categorizes packages based on volume and mass.

## Features

- **Smart Sorting**: Automatically categorizes packages into STANDARD, SPECIAL, or REJECTED stacks
- **Edge Case Handling**: Comprehensive validation for all input types and edge cases
- **Robust Testing**: Full test coverage with Jest unit tests
- **Production Ready**: Handles invalid inputs gracefully
- **Multiple Testing Methods**: Command line, Jest tests, and browser console testing

## Installation

```bash
npm install
```

## Testing
NOTE : I included 3 methods for testing. Choose your favorite.

### Method 1: Jest Unit Tests

Run the comprehensive test suite:

```bash
# Run all tests
npm test
# This will output the results of sort with jest tests

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Method 2: Node.js Command Line Testing

Test the function directly from the command line with any dimensions and mass:

```bash
# Basic usage
node sort.js <width> <height> <length> <mass>
# This will output the results in your terminal.

# Example
node sort.js 100 100 100 10        # Returns: STANDARD
```

### Method 3: Browser Console Testing

Test the function directly in your browser's developer console:

1. Open Developer Tools in your browser
2. Go to Console tab
3. Copy and paste the sort function
4. run the function with the arguments

```javascript
// Example
sort(100, 100, 100, 10)           // Returns: "STANDARD"
```