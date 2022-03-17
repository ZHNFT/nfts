import { Query } from './core/Query';

export class QueriesManager {
  private _ctors: Map<string, new (config: any) => Query<unknown>> = new Map();

  public registerQuery(type: string, Ctor: new (config: any) => Query<unknown>) {
    this._ctors.set(type, Ctor);
  }

  public createQueryInstance<T>(type: string, options: T) {
    const Ctor = this._ctors.get(type);

    if (!Ctor) {
      throw new Error(`No constructor found for type ${type}
      Using 'InteractiveQuery.registerQuery(queryType, QueryConstructor)'
      to register you own query type.
      `);
    }

    return new Ctor(options);
  }
}
