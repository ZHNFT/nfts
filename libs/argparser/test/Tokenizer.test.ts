import { Tokenizer } from '../src/ast/Tokenizer';

describe('测试分词', () => {
  const tokenizer = new Tokenizer('pnpm install abc  -D --save-dev');

  test('获取分词', () => {
    const tokens = tokenizer.readTokens();
    console.log(tokens);
  });
});
