import { Interface } from "readline";
import BaseAskHelper from "./BaseHelper";

class InputAskHelper implements BaseAskHelper {
	rl: Interface;

	constructor(rl: Interface) {
		this.rl = rl;
	}

	draw(): void {
		throw new Error("Method not implemented.");
	}

	interact(): void {
		throw new Error("Method not implemented.");
	}
}
