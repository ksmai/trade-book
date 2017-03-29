const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const DIST = path.resolve(__dirname, 'dist');
const CLIENT = path.resolve(__dirname, 'src', 'client');
const INDEX = path.join(CLIENT, 'index.html');

const config = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: './src/client/main',
  },

  output: {
    path: DIST,
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: CLIENT,
        use: ['awesome-typescript-loader', 'angular2-template-loader'],
      },
      {
        test: /\.component\.html$/,
        include: CLIENT,
        use: 'raw-loader',
      },
      {
        test: /\.component\.scss$/,
        include: CLIENT,
        use: ['raw-loader', 'sass-loader'],
      },
      {
        test: /\.scss$/,
        include: CLIENT,
        exclude: /component/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      CLIENT,
      {}
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'development',
      },
    }),
    new HTMLWebpackPlugin({
      template: INDEX,
    }),
  ],
};

module.exports = config;

