import { Command } from '@nfts/node-command';
export declare class Superior extends Command<any> {
    constructor();
    prepare(): Superior;
    _readOptionsFromConfiguration(): void;
    execute(): Promise<void>;
}
