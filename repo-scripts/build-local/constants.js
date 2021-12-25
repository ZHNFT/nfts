const { join } = require('path');

const Const = {};

Const.NFTS_CWD = process.cwd();
Const.NTFS_DEFAULT_CONFIG_PATH = join(process.cwd(), 'config');
Const.NTFS_SCHEMA_PROFILE_PATH = join(process.cwd(), 'profile');

module.exports = Const;
