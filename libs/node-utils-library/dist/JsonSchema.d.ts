import { FileSys } from './FileSys';
export declare class JsonSchema extends FileSys {
    constructor({ filePath }: {
        filePath: string;
    });
    validateSchema(): void;
}
