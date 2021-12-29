const { join } = require('path');
const { cwd } = require('process');
const fs = require('fs');

const _readJsonPackage = file => {
	const stringBuf = fs.readFileSync(file);
	const packageStr = stringBuf.toString('utf8');

	return JSON.parse(packageStr);
};

module.exports = {
	getModulePath: folder => {
		const file = join(folder);
	}
};
