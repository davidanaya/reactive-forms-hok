const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [__dirname, 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [ 'ts-loader', 'angular2-template-loader' ]
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.scss$/,
        use: ['raw-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, 'src')
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/@angular/material/prebuilt-themes/indigo-pink.css', to: 'styles' },
      { from: path.resolve(__dirname, '../src/assets'), to: 'assets' }
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};