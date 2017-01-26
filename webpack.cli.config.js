var path = require('path');
var webpack = require('webpack');

module.exports = {
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel?presets[]=react,presets[]=es2015,presets[]=stage-0',
        ], // 'babel-loader' is also a legal name to reference
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'json',
      },
    ],
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  entry: {
    cli: ['babel-polyfill', path.join(__dirname, 'src', 'botPage', 'bot', 'cli.js')],
  },
  output: {
    filename: 'lib/index.js',
  },
  plugins: [
    new webpack.BannerPlugin('#!/usr/bin/env node', { raw: true }),
  ],
}
