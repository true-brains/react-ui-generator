const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const Visualizer = require('webpack-visualizer-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.common.js')

const resolve = dir => path.join(__dirname, '../', dir);

module.exports = webpackMerge(baseConfig, {
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
  mode: 'development',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new Visualizer({
      filename: './statistics.html'
    }),

    new BundleAnalyzerPlugin({ analyzerMode: 'server' }),
  ]
});
