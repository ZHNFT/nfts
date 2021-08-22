/**
 * @public 操作。
 */
import { GmfConfiguration } from './GmfConfiguration';
export interface IGmfActionInitOptions {
    name: string;
    description: string;
    gmfConfig: GmfConfiguration;
}
export declare class GmfAction {
    readonly name: string;
    readonly description: string;
    readonly gmfConfig: GmfConfiguration;
    constructor({ name, description, gmfConfig }: IGmfActionInitOptions);
}
