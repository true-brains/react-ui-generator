const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const baseConfig = require('./webpack.common.js')

const resolve = dir => path.join(__dirname, '../', dir);

module.exports = webpackMerge(baseConfig, {
  output: {
    sourceMapFilename: '[file].map',
  },

  devtool: 'source-map',

  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: 4,
    }),

    new Visualizer({
      filename: './statistics.html'
    }),

    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ]
});
