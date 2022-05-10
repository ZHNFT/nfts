import { BgColorNumbers, Colors } from '../src/core/Colors';

test('Color Test', () => {
  Colors.cyan('yes');

  console.log(Colors.print('yes', [BgColorNumbers.black]));
});
