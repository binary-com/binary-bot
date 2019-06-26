const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry : path.join(__dirname, 'src', 'botPage', 'bot', 'index.js'),
    output: {
        path         : path.resolve(__dirname, 'lib'),
        filename     : 'index.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test   : /\.(js|jsx)$/,
                exclude: /node_modules/,
                use    : 'babel-loader',
            },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include  : /\.js$/,
            minimize : true,
            sourceMap: true,
            compress : {
                warnings: false,
            },
        }),
    ],
};
