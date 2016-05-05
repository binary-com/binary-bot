module.exports = {
  resolveLoader: {
    root: "./node_modules"
  },
  entry: {
    bot: './src/bot',
    index: './src/index',
  },
  externals: {
    jquery: 'jQuery',
    i18n: 'i18next',
    LiveApi: 'window["binary-live-api"].LiveApi',
    blockly: 'Blockly',
    BinaryCharts: 'binary-charts/PlainChart',
  },
  output: {
    filename: "[name].js",
  },
};

