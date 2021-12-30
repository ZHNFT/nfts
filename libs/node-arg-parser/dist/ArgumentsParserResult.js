import { ArgumentsParserError } from './ArgumentsParserError';
export class ArgumentsParserResult {
    constructor() {
        /**
         * 解析出来的参数对象；一旦解析完成，参数对象将被冻结，无法通过setParamValueByName更新；
         * @type {}
         */
        this.params = Object.create(null);
    }
    /**
     * 设置param值；
     * @param paramName
     * @param value
     */
    setParamValueByName(paramName, value) {
        this.params[paramName] = value;
    }
    /**
     * 获取param的值；
     * @param paramName
     */
    getParamValueByName(paramName) {
        return this.params[paramName];
    }
    /**
     * paramName是否存在与解析好的参数表中；
     * @param paramName
     */
    hasParam(paramName) {
        return Object.prototype.hasOwnProperty.call(this.params, paramName);
    }
    /**
     * 设置command名称
     * @param commandName
     */
    setCommand(commandName) {
        this.command = commandName;
    }
    addSubCommands(commandName) {
        if (this.subCommands.has(commandName)) {
            this.errors.push(new ArgumentsParserError(`SubCommandName: ${commandName} is already defined`));
            // todo Throw Error?
        }
        this.subCommands.add(commandName);
    }
    /**
     * 冻结params对象，使其无法再次被更新；
     */
    _frozen() {
        this.params = Object.freeze(this.params);
    }
}
