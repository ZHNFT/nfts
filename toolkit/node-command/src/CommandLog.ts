export interface ICommandLog {
	/*读写锁定*/
	_writeBlocking: boolean;
	_readBlocking: boolean;

	/*格式化输出*/
	format(): void;
	/*普通输出*/
	print(): void;
	/*错误输出*/
	error(): void;
	/*警告输出*/
	warn(): void;
}

export class CommandLog implements ICommandLog {
	_writeBlocking: boolean;
	_readBlocking: boolean;
	format(): void {
		throw new Error('Method not implemented.');
	}
	print(): void {
		throw new Error('Method not implemented.');
	}
	error(): void {
		throw new Error('Method not implemented.');
	}
	warn(): void {
		throw new Error('Method not implemented.');
	}
}
