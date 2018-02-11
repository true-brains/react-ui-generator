const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  entry: {
    app: resolve('src/index.jsx')
  },

  output: {
    path: resolve('out'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [ resolve('src') ],
        loader: 'babel-loader',

        options: {
          presets: ['env', 'stage-3', 'react']
          // plugins: [ 'react-hot-loader/babel' ]
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

      // Required for Lerna
      // react: path.resolve(__dirname, 'node_modules/react')
    }
  },

  devServer: {
    contentBase: resolve('out'),
    compress: true,
    host: '0.0.0.0',
    port: 9007,
    historyApiFallback: true,
    hot: false,
    inline: true,
    https: false,
    noInfo: true,
    open: false
  },

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-form-generator demo',
      inject: true,
      template: resolve('src/index.ejs')
    }),

    // new webpack.HotModuleReplacementPlugin(),

    new Visualizer({
      filename: './statistics.html'
    })
  ]
};
