const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const path = require('path');
const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  entry: resolve('src/index.tsx'),
  output: {
    filename: 'renderers-bootstrap.js',
    path: resolve('out'),
    libraryTarget: 'umd'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [resolve('src'), 'node_modules'],
    plugins: [
      new TsConfigPathsPlugin({})
    ]
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
              presets: ['env', 'stage-3', 'react']
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

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
    }
  }
};
