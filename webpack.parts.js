const PostCssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCssPlugin = require('purifycss-webpack');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || "0.0.0.0";
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true // Open the page in browser
  }
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [PostCssPresetEnv()]
            }
          }
        ]
      }
    ]
  }
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: [MiniCssExtractPlugin.loader].concat(use)
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ]
  };
};

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCssPlugin({ paths, minimize: true })]
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()]
  }
});
