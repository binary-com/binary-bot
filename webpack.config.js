import webpack from 'webpack';
import path from 'path';

module.exports = {
  devtool: 'source-map',
  module: {
    noParse: ['ws'],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  entry: {
    'bot.js': ['babel-polyfill', path.join(__dirname, 'src', 'botPage')],
    'bot.min.js': ['babel-polyfill', path.join(__dirname, 'src', 'botPage')],
    'index.js': path.join(__dirname, 'src', 'indexPage'),
    'index.min.js': path.join(__dirname, 'src', 'indexPage'),
  },
  externals: [
    {
      blockly: 'Blockly',
      tourist: 'Tourist',
      $: 'jquery',
    },
    'ws',
  ],
  output: {
    filename: '[name]',
    sourceMapFilename: '[name].map',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
  ],
};
