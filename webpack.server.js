const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const DIST = path.resolve(__dirname, 'dist');
const SERVER = path.resolve(__dirname, 'src', 'server');

const config = {
  devtool: 'source-map',

  target: 'node',

  node: {
    __dirname: true,
    __filename: true,
  },

  externals: [nodeExternals()],

  entry: {
    server: './src/server/app.js',
  },

  output: {
    path: DIST,
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: SERVER,
        use: 'babel-loader',
      }
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};

module.exports = config;

