import { createConfiguration, startServer } from "snowpack";
import { filterPackages } from "./packages";
import { clearScreen } from "./utils";

export default async function preview(scope: string[]): Promise<void> {
  clearScreen();
  const packages = filterPackages(scope, []);
  const pack = packages[0];

  if (!pack.demo.root) {
    return;
  }

  const config = createConfiguration({
    root: pack.demo.root,
    mount: {
      ".": { url: "/" },
      "../dist": { url: "/dist" },
    },
    devOptions: {
      open: "chrome",
      hostname: "localhost",
      /// hrm + plugin-react-refresh
      hmr: true,
      hmrErrorOverlay: true,
    },
    plugins: [
      /// fast refresh
      ["@snowpack/plugin-react-refresh", { babel: false }],
    ],
  });

  /// FIXME do nothing
  await startServer({
    config,
  });

  return Promise.resolve();
}
