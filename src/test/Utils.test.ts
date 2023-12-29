import { StringUtils, getStringInfo, toUpperCase } from '../app/Utils';

describe('Utils test suite', () => {
  describe.only('String Utils tests', () => {
    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
    });

    it('should return correct upperCase', () => {
      const actual = sut.toUpperCase('abc');

      expect(actual).toBe('ABC');
    });

    it('should throw error on invalid argument - function', () => {
      function expectError() {
        const actual = sut.toUpperCase('');
      }

      expect(expectError).toThrow();
      expect(expectError).toThrowError('Invalid argument!');
    });

    it('should throw error on invalid argument - arrow function', () => {
      expect(() => sut.toUpperCase('')).toThrowError('Invalid argument!');
    });

    it('should throw error on invalid argument -try catch block', (done) => {
      try {
        sut.toUpperCase('');

        done('GetStringInfo should throw error for invalid arg!');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'Invalid argument!');

        done();
      }
    });
  });

  it('should return uppercase of a valid string', () => {
    // arrange:
    const sut = toUpperCase;
    const expected = 'ABC';

    // act:
    const actual = sut('abc');

    // assert:
    expect(actual).toBe(expected);
  });

  // Parameterized Tests
  describe('ToUpperCase examples', () => {
    it.each([
      {
        input: 'abc',
        expected: 'ABC',
      },
      {
        input: 'my-string',
        expected: 'MY-STRING',
      },
      {
        input: 'world',
        expected: 'WORLD',
      },
    ])('$input toUpperCase should be $expected', ({ input, expected }) => {
      const actual = toUpperCase(input);

      expect(actual).toBe(expected);
    });
  });

  // Multiple test structures
  describe('getStringInfo for arg My-String should', () => {
    test('return right length', () => {
      const actual = getStringInfo('My-String');

      expect(actual.characters.length).toBe(9);
      expect(actual.characters).toHaveLength(9);
    });

    test('return right lowercase', () => {
      const actual = getStringInfo('My-String');
      expect(actual.lowerCase).toBe('my-string');
    });

    test('return right uppercase', () => {
      const actual = getStringInfo('My-String');

      expect(actual.upperCase).toBe('MY-STRING');
    });

    test('return right characters', () => {
      const actual = getStringInfo('My-String');

      expect(actual.characters).toEqual([
        'M',
        'y',
        '-',
        'S',
        't',
        'r',
        'i',
        'n',
        'g',
      ]);
      expect(actual.characters).toContain<String>('M');
      expect(actual.characters).toEqual(
        expect.arrayContaining(['S', 'i', 'n', 'g', 'M'])
      );
    });

    test('return return defined extra info', () => {
      const actual = getStringInfo('My-String');

      expect(actual.extraInfo).not.toBe(undefined);
      expect(actual.extraInfo).not.toBeUndefined();
      expect(actual.extraInfo).toBeDefined();
      expect(actual.extraInfo).toBeTruthy();
    });

    test('return right extra info', () => {
      const actual = getStringInfo('My-String');

      expect(actual.extraInfo).toEqual({});
    });
  });
});
