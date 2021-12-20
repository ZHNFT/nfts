const { join } = require('path');
const { cwd } = require('process');

const _exports = exports;

_exports.NTFS_DEFAULT_CONFIG_PATH = join(cwd(), 'config');

module.exports = _exports;
