import { GmfConfiguration } from './GmfConfiguration';
import { GmfContext } from './GmfContext';

/**
 * @public
 */
interface IJson {
  [index: string]:
    | string
    | number
    | boolean
    | Array<string | number | boolean | IJson>
    | IJson;
}

/**
 * @public
 */
export class GmfPlugin<TOption = void> {
  name: string;
  options: IJson;
  apply: (
    session: GmfContext,
    config: GmfConfiguration,
    options: TOption
  ) => void;
}
