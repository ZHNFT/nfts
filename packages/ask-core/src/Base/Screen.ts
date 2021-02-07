import { Interface } from "readline";

export default class Screen {
	rl: Interface;

	constructor(rl: Interface) {
		this.rl = rl;
	}
}
