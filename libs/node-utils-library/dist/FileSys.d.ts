export declare abstract class FileSys {
    private readonly _filePath;
    private readonly _cwd;
    constructor(filePath: string);
    get filePath(): string;
    private _readFile;
    private _writeFile;
    private _accessCheck;
    protected _toJson(): any;
    readJsonFile(): any;
    writeJsonFile(json: any): void;
}
