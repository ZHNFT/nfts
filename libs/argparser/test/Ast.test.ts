import { Ast } from '../src/ast/Ast';
import { Tokenizer } from '../src/ast/Tokenizer';

describe('测试语法解析', () => {
  test('分词解析正常结束', () => {
    const tokenizer = new Tokenizer(
      'pnpm install abc -D --name ${NODE_ENVIRONMENT_VARIABLE} && clean --force -f'
    );
    const ast = new Ast(tokenizer);
    const result = ast.parse();

    console.log(result);
  });

  test('分词解析错误结束', () => {
    const tokenizer = new Tokenizer(
      'pnpm install abc -D --name ${NODE_ENVIRONMENT_VARIABLE} && --force -f'
    );

    const ast = new Ast(tokenizer);

    expect(() => {
      ast.parse();
    }).toThrow();
  });
});
