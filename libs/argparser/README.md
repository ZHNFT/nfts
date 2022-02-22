# @ntfs/argparser

```typescript
import { Command } from '@ntfs/argparser';

Command.command('commandName', 'This is a command description')
  .argument({
    name: 'sub_command',
    description: 'This is a sub-command description'
  })
  .option({
    name: '--option',
    alias: '-o',
    description: 'This is an option description'
  })
  .callback(() => {
    // do something
  })
  .parse(['gmf', 'give', '--adj']);
```

fix:

- [ ] 多次设置同一个参数，最后可以解析成一个集合
