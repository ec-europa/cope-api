var fs = require('fs'),
    path = require('path'),
    defaults = require('lodash/defaults'),
    config = {};

var defaultConfigFile = path.resolve(__dirname, '../config.dist.json');
var userConfigFile = path.resolve(__dirname, '../config.json');

try {
    // Try to merge default config with user config if it exists
    fs.accessSync(userConfigFile, fs.F_OK);
    config = defaults(require(userConfigFile), require(defaultConfigFile));
} catch (e) {
    // Fall back to default config
    config = require(defaultConfigFile);
}

module.exports = config;
