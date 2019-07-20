const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  entry: resolve('src/index.tsx'),
  output: {
    filename: 'antd.js',
    path: resolve('out'),
    libraryTarget: 'umd'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  mode: 'production',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [resolve('src'), 'node_modules'],
    plugins: [new TsConfigPathsPlugin({})]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          'awesome-typescript-loader'
        ]
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },

      moment: 'moment'
    },
    '@react-ui-generator/core',
    /^antd\/.+$/
  ],
  plugins: [new CleanWebpackPlugin()]
};
