export type TFunction = () => void;

export type TParameterDefinition = {
  longName: string;
  summary: string;
  callback: TFunction;

  shortName?: string;
  required?: boolean;
};

export class BaseParameter {
  longName: string;
  summary: string;
  callback: TFunction;

  shortName?: string;
  required?: boolean;

  constructor({
    longName,
    summary,
    callback,
    shortName,
    required
  }: {
    longName: string;
    summary: string;
    callback: TFunction;
    shortName?: string;
    required?: boolean;
  }) {
    this.shortName = shortName;
    this.summary = summary;
    this.callback = callback;
    this.longName = longName;
    this.required = required;
  }
}
