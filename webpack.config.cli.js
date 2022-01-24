const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: path.join(__dirname, 'src', 'botPage', 'bot', 'cli.js'),
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new webpack.BannerPlugin({
            banner: '#!/usr/bin/env node',
            raw: true,
        }),
    ],
};
