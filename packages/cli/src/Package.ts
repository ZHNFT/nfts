import { EventEmitter } from "events";
export interface IPackageJson {
  dependencies?: {
    [key: string]: string;
  };
  devDependencies?: {
    [key: string]: string;
  };
  peerDependencies?: {
    [key: string]: string;
  };
  main: string;
  version: string;
  workspaces?: string[];
  exports: {
    node: string;
    default: string;
  };
  [key: string]: unknown;
}

interface IPackage {}
interface IPlugin {}

export default class Package extends EventEmitter implements IPackage {
  /// process command
  command: string;
  /// process command version
  commandVersion: string;
  /// current working path
  root: string;
  /// plugins
  plugins: IPlugin[] = [];

  constructor({
    command,
    commandVersion,
  }: {
    command: string;
    commandVersion: string;
  }) {
    super();
    this.command = command;
    this.commandVersion = commandVersion;
    this.root = process.cwd();
  }

  start() {
    this.emit(`${this.command}-start`);
  }

  end() {
    this.emit(`${this.command}-end`);
  }

  fatal() {
    this.emit(`${this.command}-fatal`);
  }
}
