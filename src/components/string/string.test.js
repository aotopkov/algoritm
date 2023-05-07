import { reverseString } from "./string-func";

describe("string reverse test", () => {
  test("разворот нечетной строки", () => {
    expect(reverseString('abc')).toBe('cba')
  });
  test('разворот четной строки', () => {
    expect(reverseString('abcd')).toBe('dcba')
  })
  test('один символ', () => {
    expect(reverseString('a')).toBe('a')
  })
  test('пустая строка', () => {
    expect(reverseString('')).toBe('')
  })
});
