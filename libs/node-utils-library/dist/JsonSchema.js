import { FileSys } from './FileSys';
export class JsonSchema extends FileSys {
    constructor({ filePath }) {
        super(filePath);
    }
    validateSchema() { }
}
