import { Tokenizer } from '../src/ast/Tokenizer';

describe('测试分词', () => {
  test('获取分词', () => {
    const tokenizer = new Tokenizer('pnpm install abc  -D --save-dev');

    const tokens = tokenizer.readTokens();
    console.log(tokens);
  });

  test('带变量参数', () => {
    const tokenizer1 = new Tokenizer(
      'pnpm install abc -D --name ${NODE_ENVIRONMENT_VARIABLE}'
    );
    let tokens = tokenizer1.readTokens();
    expect(tokens.length).toBe(11);

    const tokenizer2 = new Tokenizer(
      'pnpm install abc -D --name ${NODE_ENVIRONMENT_VARIABLE'
    );

    expect(() => {
      tokenizer2.readTokens();
    }).toThrow();

    const tokenizer3 = new Tokenizer(
      'pnpm install abc -D --name ${NODE_ENVIRONMENT_VARIABLE} && clean --force -f'
    );

    tokens = tokenizer3.readTokens();
    expect(tokens.length).toBe(19);
  });
});
