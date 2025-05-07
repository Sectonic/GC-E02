const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.transformer.textEncodingTransformer = require.resolve('react-native-qrcode-svg/textEncodingTransformation');
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: './global.css' })