export class BaseSubCommand {
    constructor({ subCommandDescription, subCommandName, parser }) {
        this.subCommandName = subCommandName;
        this.subCommandDescription = subCommandDescription;
        this.parser = parser;
    }
}
