export interface ArgsResult {
  _: string;
  [key: string]: string | boolean;
}

export interface ArgsInitOptions {
  defaultToTrue?: boolean;
}

function isValidMark(mark: string): boolean {
  return /^[-]{1,2}\b/.test(mark);
}

const InitialOptions: ArgsInitOptions = { defaultToTrue: true };

export default function cli_args(
  args: string[],
  options?: ArgsInitOptions
): ArgsResult {
  const res = {} as ArgsResult;

  options = { ...InitialOptions, ...options };

  let token: string;
  const _args = args.slice(0);
  let _lastMeetFlag: string | undefined;

  while ((token = _args[0])) {
    if (!_lastMeetFlag && !res._ && !isValidMark(token)) {
      res._ = token;
    }

    if (isValidMark(token)) {
      token = token.replace(/^[-]+/, '');

      if (_lastMeetFlag) {
        res[_lastMeetFlag] = options.defaultToTrue ? true : '';
      }

      _lastMeetFlag = token;
    } else {
      if (_lastMeetFlag) {
        res[_lastMeetFlag] = token;
        _lastMeetFlag = undefined;
      }
    }

    _args.splice(0, 1);
  }

  return res;
}
