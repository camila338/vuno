module.exports = function (api) {
  // The cache depends on whether Storybook is running.
  api.cache.using(() => process.env.EXPO_PUBLIC_STORYBOOK_ENABLED);
  const storybook = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';
  return {
    presets: ['babel-preset-expo'],
    // docgen is only needed for the native Storybook's controls.
    plugins: storybook ? [['babel-plugin-react-docgen-typescript', { exclude: 'node_modules' }]] : [],
  };
};
