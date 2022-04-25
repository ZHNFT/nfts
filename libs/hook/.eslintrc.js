const { dirname } = require('path');

/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ['@nfts'],
	parserOptions: {
		tsconfigRootDir: dirname(__filename)
	}
};
