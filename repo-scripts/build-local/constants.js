const { join } = require('path');
const { cwd } = require('process');

const Const = {};

Const.NTFS_DEFAULT_CONFIG_PATH = join(cwd(), 'config');
Const.NTFS_SCHEMA_PROFILE_PATH = join(cwd(), 'profile');

module.exports = Const;
