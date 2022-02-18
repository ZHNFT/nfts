//
import { GmfTool } from './cli/Gmf';

class Start {
  static execute(): void {
    new GmfTool().parse();
  }
}

Start.execute();
