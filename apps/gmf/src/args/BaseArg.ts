import { Command as Parser } from '@ntfs/argparser';
import { Hooks } from '@ntfs/noddy';

export interface IArgDefinition {
  parser: Parser;
  hooks: Hooks<unknown>;
}
