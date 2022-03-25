import { Action } from '@ntfs/noddy';
import { PluginContext } from '../core/Plugin';
import { Lifecycle } from './Lifecycle';

export abstract class ActionBase extends Action {
	protected _ctx: PluginContext;
	protected _lifecycle: Lifecycle;

	public load({
		ctx,
		lifecycle
	}: {
		ctx: PluginContext;
		lifecycle: Lifecycle;
	}): ActionBase {
		this._ctx = ctx;
		this._lifecycle = lifecycle;

		return this;
	}
}
