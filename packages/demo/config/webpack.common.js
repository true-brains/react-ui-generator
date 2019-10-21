const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const resolve = dir => path.join(__dirname, '../', dir);

module.exports = {
  entry: {
    app: resolve('src/index.jsx')
  },

  output: {
    path: resolve('out'),
    filename: '[name].js'
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
      '@actions': resolve('src/actions')
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [resolve('src')],
        loader: 'babel-loader',

        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },

      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },

  plugins: [
    new ProgressBarPlugin(),

    new HtmlWebpackPlugin({
      title: 'react-form-generator demo',
      inject: true,
      template: resolve('src/index.ejs')
    })
  ]
};
