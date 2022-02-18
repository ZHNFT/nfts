export { Command, TCommandOptions } from './Command';
export { Action } from './Action';

/*
 *
 *
 *
 * @example
 *
 *   gmf = new Command('gmf', '0.0.0');
 *
 *   delAction = new Action('del')
 *   addAction = new Action('add')
 *   delAction.appendTo(gmf);
 *   addAction.appendTo(gmf);
 *
 *   gmf.parse();
 *
 * */
