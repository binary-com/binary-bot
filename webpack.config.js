module.exports = {
  resolveLoader: {
    root: "./node_modules",
	},
	resolve: {
		alias: {
			tourist: 'tourist/tourist.js',
		},
		root: './src',
  },
  entry: {
    bot: './src/bot',
    index: './src/index',
  },
  externals: {
    blockly: 'Blockly',
  },
  output: {
    filename: "[name].js",
  },
};

