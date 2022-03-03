export type TypedArray<T> = T[];

export interface IJson {
  [key: string]:
    | number
    | string
    | TypedArray<string>
    | TypedArray<number>
    | TypedArray<IJson>
    | IJson;
}
