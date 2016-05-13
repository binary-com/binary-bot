module.exports = {
  resolveLoader: {
    root: "./node_modules",
	},
	resolve: {
		alias: {
			i18n: 'i18next',
			tourist: 'tourist/tourist.js',
		},
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

