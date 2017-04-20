const webpack = require('webpack');
const path = require('path');

const CLIENT = path.resolve(__dirname, 'src', 'client');

const config = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader'],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.component.scss$/,
        include: CLIENT,
        use: ['raw-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.scss$/,
        include: CLIENT,
        exclude: /\.component.scss$/,
        use: 'null-loader',
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'test',
      },
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      CLIENT,
      {}
    ),
  ],
};

module.exports = config;

