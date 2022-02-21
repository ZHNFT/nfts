import { CommandLine } from '@ntfs/noddy';
import { CleanAction } from '../actions/CleanAction';
import { BuildAction } from '../actions/BuildAction';
import { TestAction } from '../actions/TestAction';
import { PublishAction } from '../actions/PublishAction';

export class GmfTool extends CommandLine {
  constructor() {
    super({
      toolName: 'gmf',
      toolVersion: '0.0.0',
      toolDescription: '一个简单的命令行工具；'
    });

    this._onDefineAction();
  }

  private _onDefineAction() {
    this.addAction(new CleanAction());
    this.addAction(new BuildAction());
    this.addAction(new TestAction());
    this.addAction(new PublishAction());
  }
}
