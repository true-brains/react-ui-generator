const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
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
    plugins: [
      new TsConfigPathsPlugin({})
    ]
  },

  module: {
    rules: [
      // All files with a '.ts' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'stage-3']
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
    '@react-ui-generator/core',
  ]
};
