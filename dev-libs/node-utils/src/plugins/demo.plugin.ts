/**
 * @description demo plugin
 */

export default (ctx: any, options: any) => {
  console.log('Add plugin hook', options);
  ctx.hooks.build.tap('demo-plugin', args => {
    console.log('Execute plugin hook', args);
  });
};
