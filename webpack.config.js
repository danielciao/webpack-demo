const merge = require('webpack-merge');
const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src')
};

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo'
      }),
      new ErrorOverlayPlugin(),
      new FriendlyErrorsWebpackPlugin()
    ]
  }
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix()]
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  })
]);

const developmentConfig = merge([
  parts.loadCSS(),
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  {
    plugins: [new NyanProgressPlugin()]
  }
]);

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
