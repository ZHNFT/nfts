export type TCommandLineInitOption = {
  commandName: string;
  commandDescription: string;
};

export abstract class BaseCommand {
  readonly commandName: string;
  readonly commandDescription: string;

  /**
   * @description 定义Command参数
   */
  abstract defineParameter(): void;
}
