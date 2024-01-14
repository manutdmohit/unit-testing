import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCaseWithCb,
} from '../../app/doubles/OtherUtils';

describe.skip('OtherUtils test suite', () => {
  describe('OtherStringUtils tests with spies', () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test('Use a spy to track calls', () => {
      const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
      sut.toUpperCase('asa');
      expect(toUpperCaseSpy).toHaveBeenCalledWith('asa');
    });

    test('Use a spy to track calls to other module', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      sut.logString('abc');
      expect(consoleLogSpy).toHaveBeenCalledWith('abc');
    });

    test.only('Use a spy to replace the implementation of a method', () => {
      jest.spyOn(sut as any, 'callExternalService').mockImplementation(() => {
        console.log('calling mocked implementation!!!');
      });

      (sut as any).callExternalService();
    });
  });

  describe('Tracking callbacks with Jest mocks', () => {
    // jest mock

    const callBackMock = jest.fn(); // This creates mock

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('calls callback for invalid argument - track calls', () => {
      const actual = toUpperCaseWithCb('', callBackMock);
      expect(actual).toBeUndefined;

      expect(callBackMock).toHaveBeenCalledWith('Invalid argument !');
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });

    it('calls callback for valid argument - track calls', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);
      expect(actual).toBe('ABC');

      expect(callBackMock).toHaveBeenCalledWith('called function with abc');
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });
  });

  // our own mock
  describe('Tracking callbacks', () => {
    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      // clearing tracking fields;
      cbArgs = [];
      timesCalled = 0;
    });

    it('calls callback for invalid argument -track calls', () => {
      const actual = toUpperCaseWithCb('', callBackMock);
      expect(actual).toBeUndefined;
      expect(cbArgs).toContain('Invalid argument !');
      expect(timesCalled).toBe(1);
    });

    it('calls callback for valid argument -track calls', () => {
      const actual = toUpperCaseWithCb('abc', callBackMock);
      expect(actual).toBe('ABC');
      expect(cbArgs).toContain('called function with abc');
      expect(timesCalled).toBe(1);
    });
  });

  it('ToUpperCase - calls callback for invalid argument', () => {
    const actual = toUpperCaseWithCb('', () => {}); // ()=>{} is a fake

    expect(actual).toBeUndefined;
  });

  it('ToUpperCase - calls callback for valid argument', () => {
    const actual = toUpperCaseWithCb('abc', () => {}); // ()=>{} is a fake

    expect(actual).toBe('ABC');
  });

  it('Calculates complexity', () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: 'someInfo',
        field2: 'someOtherInfo',
      },
    };

    // stubs
    const actual = calculateComplexity(someInfo as any);

    expect(actual).toBe(10);
  });
});
