const DEFAULT_CONFIG_FILE_PATH = './snowpack.config.js';

/** @type {import("snowpack").SnowpackUserConfig } */
const REACT_DEV_SNOWPACK_CONFIG = {
  plugins: ['@snowpack/plugin-react-refresh', ['@snowpack/plugin-typescript', {}]],
  devOptions: {
    open: true,
    hmr: true
  },
  mount: {
    public: { url: '/', static: true },
    src: '/dist'
  }
};
