export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCallBack = (arg: string) => void;

// stubs
export function calculateComplexity(stringInfo: stringInfo) {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

// fakes
export function toUpperCaseWithCb(
  arg: string,
  callBack: LoggerServiceCallBack
) {
  if (!arg) {
    callBack('Invalid argument !');
    return;
  }

  callBack(`called function with ${arg}`);
  return arg.toUpperCase();
}
