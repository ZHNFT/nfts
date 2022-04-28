import { Confirm, IConfirmConfig } from './types/Confirm';
import { IInputConfig, Input } from './types/Input';
import { IPasswordConfig, Password } from './types/Password';
import { ISelectConfig, Select } from './types/Select';
import { QueriesManager } from './QueryManager';

export type TQueryConfig = (IConfirmConfig | IInputConfig | IPasswordConfig | ISelectConfig) & {
  type: 'confirm' | 'input' | 'password' | 'select';
};

export class InteractiveQuery extends QueriesManager {
  private readonly _queries: TQueryConfig[] = [];

  constructor(queries: TQueryConfig[]) {
    super();

    this._queries = queries;

    this.registerQuery('input', Input);
    this.registerQuery('confirm', Confirm);
    this.registerQuery('password', Password);
    this.registerQuery('select', Select);
  }

  public async prompt<T>(): Promise<T> {
    const answers = {} as T;

    for await (const _query of this._queries) {
      const { type, ...restOptions } = _query;
      const _instance = this.createQueryInstance(type, restOptions);
      answers[restOptions.name] = await _instance.execute();
      _instance.screen.nextLine().clearInline(-1);
    }

    return answers;
  }
}

export { Confirm, IConfirmConfig };
export { IInputConfig, Input };
export { IPasswordConfig, Password };
export { ISelectConfig, Select };

export { Screen } from './core/Screen';
export { Colors, BgColorNumbers, TextColorNumbers } from './core/Colors';
export { Query } from './core/Query';
