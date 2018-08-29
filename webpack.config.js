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
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
  records: path.join(__dirname, 'records.json')
};

const commonConfig = merge([
  parts.clean(PATHS.build),
  parts.entry(),
  parts.output(),
  parts.loadJavaScript({
    include: PATHS.app
  }),
  parts.setWebpackVariable('HELLO', 'Hello from config 😘'),
  {
    recordsPath: PATHS.records,
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
  parts.minifyJavaScript(),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true
      }
    }
  }),
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix()]
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),
  parts.generateSourceMaps({
    type: 'source-map'
  }),
  parts.extractBundles(),
  parts.attachRevision(),
  {
    performance: {
      hints: 'warning', // "error" or false are valid too
      maxEntrypointSize: 50000, // in bytes, default 250k
      maxAssetSize: 450000 // in bytes
    }
  }
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
  // pass webpack env to babel
  process.env.BABEL_ENV = mode;

  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
