import { StringParameter } from './StringParameter';
import { ArrayParameter } from './ArrayParameter';
import { FlagParameter } from './FlagParameter';

export * from './StringParameter';
export * from './ArrayParameter';
export * from './FlagParameter';

export type TParameter = StringParameter | ArrayParameter | FlagParameter;
