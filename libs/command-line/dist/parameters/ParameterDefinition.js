export var ParameterKinds;
(function (ParameterKinds) {
    ParameterKinds["STRING"] = "STRING";
    ParameterKinds["BOOLEAN"] = "BOOLEAN";
    ParameterKinds["ARRAY"] = "ARRAY";
    ParameterKinds["INTEGER"] = "INTEGER";
})(ParameterKinds || (ParameterKinds = {}));
export class ParameterDefinitionBase {
    constructor(opts) {
        this.paramName = opts.paramName;
        this.paramShortName = opts.paramShortName;
        this.paramDescription = opts.paramDescription;
        this.required = opts.require;
    }
    get value() {
        return this._value;
    }
    set value(_) {
        throw Error(`Unable to set readonly value`);
    }
    setValue(value) {
        const _kind = this.kind;
        if (!_kind) {
            console.warn(`Undetermined kind for option name: --${this.paramName}`);
        }
        let _value;
        try {
            switch (_kind) {
                case ParameterKinds.INTEGER:
                    _value = Number(value);
                    break;
                case ParameterKinds.BOOLEAN:
                    _value = Boolean(value);
                    break;
                case ParameterKinds.ARRAY:
                    _value = value.split(',');
                default:
                    _value = value;
                    break;
            }
        }
        catch (e) {
            console.error(e);
        }
        this._value = _value;
    }
}
