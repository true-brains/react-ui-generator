const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const resolve = dir => path.join(__dirname, '../', dir);

module.exports = {
  entry: {
    app: resolve('src/index.jsx')
  },

  output: {
    path: resolve('out'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [ resolve('src') ],
        loader: 'babel-loader',

        options: {
          presets: ['env', 'stage-3', 'react']
        }
      }
    ]
  },

  resolve: {
    modules: [resolve('src'), 'node_modules'],

    extensions: ['.js', '.jsx', '.json'],

    alias: {
      '@': resolve('src'),
      '@components': resolve('src/components'),
      '@containers': resolve('src/containers'),
      '@meta': resolve('src/meta'),
      '@validation': resolve('src/validation'),
      '@actions': resolve('src/actions'),
    }
  },

  plugins: [
    new ProgressBarPlugin(),

    new HtmlWebpackPlugin({
      title: 'react-form-generator demo',
      inject: true,
      template: resolve('src/index.ejs')
    }),
  ]
};
