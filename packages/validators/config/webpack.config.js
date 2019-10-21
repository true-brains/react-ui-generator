const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  entry: resolve('src/index.ts'),
  output: {
    filename: 'validators.js',
    path: resolve('out'),
    libraryTarget: 'umd'
  },

  devtool: 'source-map',
  mode: 'production',

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [resolve('src'), 'node_modules'],
    plugins: [new TsConfigPathsPlugin({})]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          'awesome-typescript-loader'
        ],
        exclude: /node_modules/
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  externals: ['@react-ui-generator/core', /^lodash-es(\/.+)?$/],
  plugins: [new CleanWebpackPlugin()]
};
