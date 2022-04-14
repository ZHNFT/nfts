export type Task<Args> = (arg: Args) => void | Promise<void>;

export async function serialize<TaskArgs = unknown>(
  tasks: ((arg?: TaskArgs) => void | Promise<void>)[],
  args?: TaskArgs
) {
  return tasks.reduce((promise, task): Promise<void> => {
    return promise.then(
      () => task(args),
      (e: unknown) => Promise.reject(e)
    );
  }, Promise.resolve());
}
