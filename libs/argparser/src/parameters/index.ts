import { StringParameter } from './StringParameter';
import { ArrayParameter } from './ArrayParameter';
import { FlagParameter } from './FlagParameter';

export * from './StringParameter';
export * from './ArrayParameter';
export * from './FlagParameter';

export type TParameter = StringParameter | ArrayParameter | FlagParameter;

/*
 * keyOf parameter object
 * */
export type KeyOfParameters<T> = T extends Record<string, TParameter> ? keyof T : unknown;

/**
 * valueOf parameter object
 */
export type ValueOfParameters<T> = T extends Record<string, TParameter>
  ? {
      [U in keyof T]: T[U]['value'];
    }
  : unknown;
