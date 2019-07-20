const path = require('path');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.common.js')


module.exports = webpackMerge(baseConfig, {
  output: {
    sourceMapFilename: '[file].map',
  },

  devtool: 'source-map',
  mode: 'production',

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
