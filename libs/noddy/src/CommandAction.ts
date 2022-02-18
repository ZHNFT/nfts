import { Action } from '@ntfs/argparser';

export abstract class CommandAction extends Action {
  protected constructor(opt: { name: string; description: string }) {
    super(opt);

    this.onDefineOptions();
    this.addCallback(this.apply);
  }

  abstract apply(arg: any[]): void;
  abstract onDefineOptions(): void;
}
