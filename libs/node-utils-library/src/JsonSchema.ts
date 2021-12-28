import { FileSys } from './FileSys';

export class JsonSchema extends FileSys {
	constructor({ filePath }: { filePath: string }) {
		super(filePath);
	}

	validateSchema() {}
}
