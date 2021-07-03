'use strict';

exports.createPages = require('./gatsby/create-pages');
exports.onCreateNode = require('./gatsby/on-create-node');
exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();
  // Get the mini-css-extract-plugin
  const miniCssExtractPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin',
  );
  // Set the option here to true.
  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.ignoreOrder = true;
  }
  // Update the config.
  actions.replaceWebpackConfig(config);
};
