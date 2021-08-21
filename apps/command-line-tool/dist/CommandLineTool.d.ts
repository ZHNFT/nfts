interface CommandLineInfo {
    name: string;
    description: string;
}
export default class CommandLineTool {
    #private;
    constructor({ name, description }: CommandLineInfo);
    get name(): string;
    get description(): string;
}
export {};
