export class NodeError {
  name: string;
  description: string;
  stack: string[];

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
