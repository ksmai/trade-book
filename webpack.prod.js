const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const FaviconsPlugin = require('favicons-webpack-plugin');

const CLIENT = path.resolve(__dirname, 'src', 'client');
const DIST = path.resolve(__dirname, 'dist');
const INDEX = path.join(CLIENT, 'index.html');
const TSCONFIG = path.join(__dirname, 'tsconfig.json');
const APP_MODULE = path.join(CLIENT, 'app', 'app.module') + '#AppModule';
const TEST_HELPERS = path.join(CLIENT, 'testing');

const config = {
  devtool: 'source-map',

  entry: {
    polyfills: './src/client/polyfills.ts',
    main: './src/client/main.ts',
  },

  output: {
    path: DIST,
    filename: '[name].[chunkhash].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: '@ngtools/webpack',
      },
      {
        test: /\.component\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
          },
        },
      },
      {
        test: /\.component\.s?css$/,
        use: [
          'to-string-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.s?css$/,
        exclude: /\.component\.s?css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
          fallback: 'style-loader',
        }),
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.ContextReplacementPlugin(
      /angular(?:\\|\/)core(?:\\|\/)@angular/,
      CLIENT,
      {}
    ),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.[chunkhash].js',
      chunks: ['main'],
      minChunks: function (module) {
        return module.context &&
          module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.[chunkhash].js',
      minChunks: Infinity,
    }),
    new AotPlugin({
      tsConfigPath: TSCONFIG,
      entryModule: APP_MODULE,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new FaviconsPlugin('assets/favicon.svg'),
    new HTMLWebpackPlugin({
      template: INDEX,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        caseSensitive: true,
      },
    }),
  ],
};

module.exports = config;

