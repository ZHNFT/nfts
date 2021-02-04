import { Interface } from "readline";

export default interface BaseAskHelper {
// readline interface
	rl: Interface;
// draw message to console
	draw(): void;
// console interaction
	interact(): void;
};
