import { PluginImpl } from "@initializer/cli";

const jest: PluginImpl = async (api) => {
  console.log(api);
};

export default jest;
