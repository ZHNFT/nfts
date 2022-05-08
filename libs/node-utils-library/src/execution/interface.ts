export type TTaskCallback<T> = (args?: T) => void;
export type TSyncTask<TArgs = unknown, TRes = void> = (args?: TArgs, callback?: TTaskCallback<TArgs>) => TRes;
export type TAsyncTask<TArgs = unknown, TRes = void> = (args?: TArgs, callback?: TTaskCallback<TArgs>) => Promise<TRes>;
export type TTask<TArgs = unknown, TRes = void> = TSyncTask<TArgs, TRes> | TAsyncTask<TArgs, TRes>;
