/* JsonType Shape */

export type TypedArray<T> = T[];

export interface IJson {
  [key: string]:
    | number
    | string
    | IJson
    | TypedArray<string>
    | TypedArray<number>
    | TypedArray<IJson>;
}
