import { DebugTool } from '@nfts/noddy';

export function getScopedLogger(scope: string): DebugTool.Debug {
  return DebugTool.Debug.getScopedLogger(scope);
}
