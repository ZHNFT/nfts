import cli_args from '@nfts/node-args';
export class ICommandTool {
    // 解析命令行参数
    commandLineArgumentsParser() {
        return cli_args(process.argv.slice(2));
    }
}
export class CommandTool extends ICommandTool {
    constructor() {
        super();
        this.addCommand = (commandName, command) => this.commands.set(commandName, command);
        this.getCommand = (name) => {
            return this.commands.get(name);
        };
        this.commands = new Map();
        this.rawArgs = process.argv.slice(2);
        this.argsParseResult = this.commandLineArgumentsParser();
    }
}
