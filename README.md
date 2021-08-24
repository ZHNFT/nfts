# Readme

```typescript
/**
 *
 * @param args
 *
 * @example
 *
 * const result = argumentsParser(['command', '--a', 'a', '-b', 'b', '--true', '--alsoTrue'])
 *
 * result // {
 *   _: ['command'],
 *   'a': 'a',
 *   'b': 'b',
 *   'true': true,
 *   'alsoTrue': true,
 *  }
 *
 */
export function argumentsParser<T>(
  args: string[]
): ParsedCommandLineOptions<T> {
  const obj = Object.create(null);

  let option: string;
  let prevFlagName: string;

  obj._ = [] as string[];

  while ((option = args.shift())) {
    if (/^[-]{1,2}\w/.test(option)) {
      if (prevFlagName) {
        obj[prevFlagName] = true;
      }

      prevFlagName = option.startsWith('--')
        ? option.replace('--', '')
        : option.replace('-', '');
    } else {
      if (prevFlagName) {
        obj[prevFlagName] = option;
      } else {
        obj._.push(option);
      }

      prevFlagName = '';
    }
  }

  return obj;
}
```
