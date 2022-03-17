import { Confirm, IConfirmConfig } from './types/Confirm';
import { IInputConfig, Input } from './types/Input';
import { IPasswordConfig, Password } from './types/Password';
import { ISelectConfig, Select } from './types/Select';
import { QueriesManager } from './QueryManager';

export type TQueryConfig = (
  | IConfirmConfig
  | IInputConfig
  | IPasswordConfig
  | ISelectConfig
) & { type: 'confirm' | 'input' | 'password' | 'select' };

// Query Manager
export class InteractiveQuery extends QueriesManager {
  private readonly _queries: TQueryConfig[] = [];

  constructor(queries: TQueryConfig[]) {
    super();

    this.registerQuery('input', Input);
    this.registerQuery('confirm', Confirm);
    this.registerQuery('password', Password);
    this.registerQuery('select', Select);

    this._queries = queries;
  }

  public async prompt<T>(): Promise<T> {
    const answers = {} as T;

    for await (const _query of this._queries) {
      const { type, ...restOptions } = _query;
      const _instance = this.createQueryInstance(type, restOptions);
      const _answer = await _instance.execute();
      _instance.screen.nextLine().moveCursorInline(0);
      answers[restOptions.name] = _answer;
    }

    return answers;
  }
}

export { Confirm, IConfirmConfig };
export { IInputConfig, Input };
export { IPasswordConfig, Password };
export { ISelectConfig, Select };
export { Screen } from './core/Screen';
export { Colors } from './core/Colors';
export { Query } from './core/Query';
