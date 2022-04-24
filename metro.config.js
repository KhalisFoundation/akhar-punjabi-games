const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    assets: ['./assets/fonts'],
    assetExts: [...defaultConfig.resolver.assetExts, 'db'],
  },
};