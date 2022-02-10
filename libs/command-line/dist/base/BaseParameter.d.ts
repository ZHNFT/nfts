export declare type TFunction = () => void;
export declare type TParameterDefinition = {
    longName: string;
    summary: string;
    callback: TFunction;
    shortName?: string;
    required?: boolean;
};
export declare class BaseParameter {
    longName: string;
    summary: string;
    callback: TFunction;
    shortName?: string;
    required?: boolean;
    constructor({ longName, summary, callback, shortName, required }: {
        longName: string;
        summary: string;
        callback: TFunction;
        shortName?: string;
        required?: boolean;
    });
}
