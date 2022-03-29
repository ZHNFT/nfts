import { StringOption } from './StringOption';
import { ArrayOption } from './ArrayOption';
import { FlagOption } from './FlagOption';

export * from './StringOption';
export * from './ArrayOption';
export * from './FlagOption';

export type TOption = StringOption | ArrayOption | FlagOption;
