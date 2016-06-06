var path = require('path');
var defaultsDeep = require('lodash/defaultsDeep');
var config = {};

var defaultConfigFile = path.resolve(__dirname, '../config.dist.json');
var userConfigFile = path.resolve(__dirname, '../config.json');

try {
  // Try to merge default config with user config if it exists
  // eslint-disable-next-line global-require
  config = defaultsDeep(require(userConfigFile), require(defaultConfigFile));
} catch (e) {
  // Fall back to default config
  // eslint-disable-next-line global-require
  config = require(defaultConfigFile);
}

module.exports = config;
