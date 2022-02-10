export class BaseParameter {
    constructor({ longName, summary, callback, shortName, required }) {
        this.shortName = shortName;
        this.summary = summary;
        this.callback = callback;
        this.longName = longName;
        this.required = required;
    }
}
