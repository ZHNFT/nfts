import { Lifecycle, CommonPhases } from '../classes/Lifecycle';

export type BuildPhases = CommonPhases;

export class BuildLifecycle extends Lifecycle<BuildPhases> {
	constructor() {
		super();
	}
}
