import { PackageJsonLookup } from '../src/packageJson/PackageJsonLookup';

it('should read json file with no error', () => {
  const pkg = PackageJsonLookup.instance.lookupByDir('./test/dump-files');
  expect(pkg.name).toBe('test-package-name');
});
