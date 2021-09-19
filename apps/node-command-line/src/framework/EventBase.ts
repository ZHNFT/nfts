/**
 * @class EventBase
 */

export class EventBase {
  #_name: string;

  constructor({ name }: { name: string }) {
    this.#_name = name;
  }

  apply() {
    //
  }
}
