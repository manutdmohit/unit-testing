import {
  PasswordChecker,
  PasswordErrors,
} from '../../app/pass_checker/PasswordChecker';

describe('PasswordChecker test suite', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('should return password with less than 8 chars is invalid', () => {
    const actual = sut.checkPassword('1234567');

    expect(actual.reasons).toContain(PasswordErrors.SHORT);
    expect(actual.valid).toBe(false);
  });

  it('should return password with more than 8 or more chars is ok', () => {
    const actual = sut.checkPassword('12345678');

    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it('should return password with no upper case letter is invalid', () => {
    const actual = sut.checkPassword('abcd');

    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
    expect(actual.valid).toBe(false);
  });

  it('should return password with upper case letter is valid', () => {
    const actual = sut.checkPassword('abcD');

    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it('should return password with no lower case letter is invalid', () => {
    const actual = sut.checkPassword('ABCD');

    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
    expect(actual.valid).toBe(false);
  });

  it('should return password with lower case letter is valid', () => {
    const actual = sut.checkPassword('ABCDa');

    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('should return complex password is valid', () => {
    const actual = sut.checkPassword('1234ABCDefgh');

    expect(actual.reasons).toHaveLength(0);
    expect(actual.valid).toBe(true);
  });

  it('should return admin password with no number is invalid', () => {
    const actual = sut.checkAdminPassword('ABCDefgh');

    expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
    expect(actual.valid).toBe(false);
  });

  it('should return admin password with number is valid', () => {
    const actual = sut.checkAdminPassword('ABCDefgh123');

    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
  });
});
