export type Option = {
  message?: string;
  validator?: () => boolean;
  filter?: <T>(val: T) => T;
  transformer?: <T, P>(val: T) => P;
};

const validator = () => true;
const filter = <T>(val: T) => val;
const transformer = <T>(val: T) => val;

export function getPromptConfig(config: Option) {
  return {
    filter,
    validator,
    transformer,
    ...config,
  };
}
