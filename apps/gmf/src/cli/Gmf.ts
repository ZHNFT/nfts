import { CommandLine } from '@ntfs/noddy';
import { CleanAction } from '../actions/CleanAction';
import { BuildAction } from '../actions/BuildAction';

export class GmfTool extends CommandLine {
  constructor() {
    super({
      toolName: 'gmf',
      toolVersion: '0.0.0',
      toolDescription: ''
    });

    this._onDefineAction();
    this._onDefineTools();
  }

  private _onDefineAction() {
    this.addAction(new CleanAction());
    this.addAction(new BuildAction());
  }

  private _onDefineTools() {}
}
