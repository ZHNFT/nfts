import { resolve } from "path";
import { CommandLine } from "@nfts/noddy";
import {
	FlagParameter,
	ArrayParameter,
	ValueOfParameters,
} from "@nfts/argparser";
import { Generator } from "./Generator";

/*
 * 模板目标平台
 * */
export enum Platforms {
	react = "react",
	node = "node",
}

/*
 * create 指令的参数
 * */
export type TCreationCommandLineParameters = {
	ts: FlagParameter;
	platform: ArrayParameter;
};

export type TCreationParameters =
	ValueOfParameters<TCreationCommandLineParameters>;

export default class Creator
	extends CommandLine
	implements TCreationCommandLineParameters
{
	ts: FlagParameter;
	platform: ArrayParameter;

	constructor() {
		super({
			toolName: "create-app",
			toolDescription: "Project templates",
		});

		this.ts = this.flagParameter({
			name: "--ts",
			summary: "Using typescript boostrap your project",
		});

		this.platform = this.arrayParameter({
			name: "--platform",
			summary: "Generate template for specific platform",
			alternatives: Object.keys(Platforms),
		});
	}

	async onExecute(_: unknown, actions: string[]): Promise<void> {
		const parameters: ValueOfParameters<{
			ts: FlagParameter;
			platform: ArrayParameter;
		}> = {
			ts: this.ts.value,
			platform: this.platform.value,
		};

		await Generator.run(parameters, resolve(process.cwd(), actions[1] ?? "."));
	}
}
