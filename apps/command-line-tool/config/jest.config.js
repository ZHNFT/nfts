//@ts-check
/**
 *
 * @returns {import('@jest/types').Config.InitialOptions}
 */
function jestConfig() {
  return {
    rootDir: '../',
    bail: true,
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?': 'ts-jest'
    },
    testMatch: ['<rootDir>/__tests__/**/*.+(ts|tsx)']
  };
}

module.exports = jestConfig();
