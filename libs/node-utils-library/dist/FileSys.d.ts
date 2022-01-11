export declare class FileSys {
    private readonly _filePath;
    private readonly _cwd;
    constructor(filePath: string);
    static getAbsolutePath(filePath: string): string;
    get filePath(): string;
    get filePathAbs(): string;
    readFile(): string;
    readJsonFile<T>(): T;
    updateJsonFile<T>(json: Partial<T>): void;
    private _readFile;
    private _writeFile;
    private _accessCheck;
    private _toJson;
}
