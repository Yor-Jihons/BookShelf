import { add, subtract } from './math';

describe('Math Utilities', () => {
  it('should correctly add two numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(5, 5)).toBe(10);
  });

  it('should correctly subtract two numbers', () => {
    expect(subtract(5, 2)).toBe(3);
    expect(subtract(10, 3)).toBe(7);
  });
});
