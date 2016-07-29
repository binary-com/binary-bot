module.exports = {
  devtool: 'source-map',
  resolveLoader: {
    root: path.join(__dirname, "node_modules"),
	},
	resolve: {
		alias: {
			tourist: 'tourist/tourist.js',
		},
    root:path.join(__dirname, 'src', 'common')
  },
  entry: {
    bot: path.join(__dirname, 'src', 'bot','bot'),
    index:path.join(__dirname, 'src','index','index'),
  },
  externals: {
    blockly: 'Blockly',
  },
  output: {
    filename: "[name]-[chunkhash].js",
    sourceMapFilename: "[name]-[chunkhash].map"
  },
};

