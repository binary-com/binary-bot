module.exports = {
  devtool: 'source-map',
  resolveLoader: {
    root: "./node_modules",
	},
	resolve: {
		alias: {
			tourist: 'tourist/tourist.js',
		},
    root: './src/common'
  },
  entry: {
    bot: './src/bot/bot',
    index: './src/index/index',
  },
  externals: {
    blockly: 'Blockly',
  },
  output: {
    filename: "[name]-[chunkhash].js",
    sourceMapFilename: "[name]-[chunkhash].map"
  },
};

