import * as readline from "readline";
import * as tty from "tty";

type Callback = (key: readline.Key) => void;

function on(callback: Callback): (_buf: Buffer, key: readline.Key) => void {
  return (_buf, key) => {
    callback(key);
  };
}

function off(rl: readline.Interface) {
  rl.pause();
  rl.close();
}

export default function keypress(
  stdin: tty.ReadStream,
  callback: Callback,
): () => void {
  const rl = readline.createInterface({
    input: stdin,
    terminal: true,
  });

  readline.emitKeypressEvents(stdin, rl);
  stdin.on("keypress", on(callback));

  return () => {
    off(rl);
  };
}
