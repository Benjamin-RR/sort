const { sort } = require('../sort');

describe('Package Sorting Function', () => {
  describe('Valid package scenarios', () => {
    test('should return STANDARD for normal packages', () => {
      expect(sort(100, 100, 100, 10)).toBe('STANDARD');
    });

    test('should return STANDARD for mass just below 20 kg', () => {
      expect(sort(100, 100, 100, 19.9)).toBe('STANDARD');
    });

    test('should return SPECIAL for bulky packages (dimension >= 150 cm)', () => {
      expect(sort(150, 100, 100, 10)).toBe('SPECIAL');
    });

    test('should return SPECIAL for heavy packages (mass >= 20 kg)', () => {
      expect(sort(100, 100, 100, 20)).toBe('SPECIAL');
    });

    test('should return SPECIAL for packages with large volume', () => {
      // 100 x 100 x 100 = 1,000,000 cm³ (exactly at the limit)
      expect(sort(100, 100, 100, 10)).toBe('STANDARD');
      
      // 100 x 100 x 100.1 = 1,001,000 cm³ (above the limit)
      expect(sort(100, 100, 100.1, 10)).toBe('SPECIAL');
    });

    test('should return REJECTED for packages that are both bulky and heavy', () => {
      expect(sort(150, 100, 100, 20)).toBe('REJECTED');
    });
  });

  describe('Edge cases and invalid inputs', () => {
    test('should return REJECTED for wrong argument types (string)', () => {
      expect(sort("lala", 1, -1, true)).toBe('REJECTED');
    });

    test('should return REJECTED for missing arguments', () => {
      expect(sort(100, 100, 100)).toBe('REJECTED');
    });

    test('should return REJECTED for zero values', () => {
      expect(sort(100, 100, 100, 0)).toBe('REJECTED');
    });

    test('should return REJECTED for negative values', () => {
      expect(sort(100, 100, 100, -5)).toBe('REJECTED');
    });

    test('should return REJECTED for infinite values', () => {
      expect(sort(100, 100, 100, Infinity)).toBe('REJECTED');
    });

    test('should return REJECTED for NaN values', () => {
      expect(sort(100, 100, 100, NaN)).toBe('REJECTED');
    });

    test('should return REJECTED for object arguments', () => {
      expect(sort(100, {hello: "world"}, 100, 10)).toBe('REJECTED');
    });

    test('should return REJECTED for array arguments', () => {
      expect(sort([1,2,3], 100, 100, 19.9)).toBe('REJECTED');
    });

    test('should return REJECTED for null arguments', () => {
      expect(sort(100, 100, null, 19.9)).toBe('REJECTED');
    });

    test('should return REJECTED for undefined arguments', () => {
      expect(sort(100, 100, 100, undefined)).toBe('REJECTED');
    });

    test('should return REJECTED for NaN in dimensions', () => {
      expect(sort(100, NaN, 100, 10)).toBe('REJECTED');
    });
  });

  describe('Boundary conditions', () => {
    test('should handle exact boundary values correctly', () => {
      // Exactly at 150 cm dimension
      expect(sort(150, 100, 100, 10)).toBe('SPECIAL');
      
      // Exactly at 20 kg mass
      expect(sort(100, 100, 100, 20)).toBe('SPECIAL');
      
      // Just below 150 cm dimension but volume still makes it bulky
      expect(sort(149.9, 100, 100, 10)).toBe('SPECIAL'); // Volume: 1,499,000 cm³ > 1,000,000
      
      // Just below 20 kg mass
      expect(sort(100, 100, 100, 19.9)).toBe('STANDARD');
    });

    test('should handle volume boundary correctly', () => {
      // Volume exactly at 1,000,000 cm³
      expect(sort(100, 100, 100, 10)).toBe('STANDARD');
      
      // Volume just above 1,000,000 cm³
      expect(sort(100, 100, 100.1, 10)).toBe('SPECIAL');
    });
  });
});
