import { Execution } from "@nfts/node-utils-library";
import { Hook } from "../classes/Hook";

export class WaterfallHook<TArgs> extends Hook<TArgs, TArgs | Promise<TArgs>> {
  public call(args: TArgs): Promise<TArgs> {
    const tasks = Array.from(this.taskByName.values());
    return Execution.waterfall(
      tasks.map((task) => {
        return task.apply.bind(task);
      }),
      args
    );
  }
}
