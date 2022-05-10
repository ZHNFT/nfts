import { Debug } from '@nfts/noddy';

export function getScopedLogger(scope: string): Debug {
  return Debug.getScopedLogger(scope, {
    scopePrefix: true
  });
}
