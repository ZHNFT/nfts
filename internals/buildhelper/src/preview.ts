import { createConfiguration, startServer } from "snowpack";
import { filterPackages } from "./packages";

export default async function preview(scope: string[]): Promise<void> {
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
      /// hrm + plugin-react-referesh
      hmr: true,
      hmrErrorOverlay: true,
    },
    plugins: [
      /// fast referesh
      ["@snowpack/plugin-react-refresh", { babel: false }],
    ],
  });

  /// FIXME do nothing
  await startServer({
    config,
  });

  return Promise.resolve();
}
