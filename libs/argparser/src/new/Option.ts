export interface IBaseOption {
  readonly name: string;
  readonly description: string;
  readonly required?: boolean;
  readonly alias?: string;
}

export class Option implements IBaseOption {
  readonly name: string;
  readonly description: string;

  /*
   * 所属参数名称；
   * 表明当前选项的所属参数；
   * */
  readonly belongTo: string;

  /**
   * 是否必须；
   * 用于设置参数是否可选项，必填但是未解析到将会抛出异常；
   */
  readonly required: boolean;

  /**
   * 别称；
   * 通常作为option名称的简写出现在命令行中；
   */
  readonly alias?: string;

  public static maybeOption(optionName: string): boolean {
    return /^-{1,2}([a-z-]+)/.test(optionName);
  }

  /**
   * @desc 移除option前带的中横线前缀
   */
  public strippedName(): string {
    return /^-{1,2}([a-z-]+)/.exec(this.name)[1];
  }

  constructor({
    name,
    description,
    belongTo,
    required,
    alias
  }: IBaseOption & { belongTo: string; required: boolean; alias?: string }) {
    this.name = name;
    this.description = description;
    this.required = required;
    this.belongTo = belongTo;

    this.alias = alias;
  }
}
