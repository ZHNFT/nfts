import { CommandLine } from '@ntfs/noddy';
import { CleanAction } from '../actions/clean';
import { BuildAction } from '../actions/build';

export class GmfTool extends CommandLine {
  constructor() {
    super({
      toolName: 'gmf',
      toolVersion: '0.0.0',
      toolDescription: ''
    });

    this._onDefineAction();
  }

  private _onDefineAction() {
    this.addAction(new CleanAction());
    this.addAction(new BuildAction());
  }
}
