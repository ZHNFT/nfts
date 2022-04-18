export type THookCallback<TCallbackArgs = unknown> = (
  args: TCallbackArgs
) => void | Promise<void>;

export abstract class Hook<TArgs> {
  // Use Set to avoid duplicate callback
  private _callbacks: Set<THookCallback<TArgs>> = new Set();

  public addHook() {}

  public emitHook() {}
}
