export interface ArgsResult {
    _: string;
    [key: string]: string | boolean;
}
export interface ArgsInitOptions {
    defaultToTrue?: boolean;
}
export default function cli_args(args: string[], options?: ArgsInitOptions): ArgsResult;
