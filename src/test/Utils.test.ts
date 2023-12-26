import { getStringInfo, toUpperCase } from '../app/Utils';

describe('Utils test suite', () => {
  it('should return uppercase of a valid string', () => {
    // arrange:
    const sut = toUpperCase;
    const expected = 'ABC';

    // act:
    const actual = sut('abc');

    // assert:
    expect(actual).toBe(expected);
  });

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
