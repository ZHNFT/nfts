export type TypedArray<T> = T[];

export interface IJson {
  [key: string]: number | string | IJson | any[];
}
