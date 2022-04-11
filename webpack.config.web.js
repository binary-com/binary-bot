const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const production = process.env.NODE_ENV === 'production';

const plugins = [
    new Dotenv(),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
    }),
];

const productionPlugins = () => {
    const args = {};
    if (process.env.ARGS.indexOf('--test')) {
        args.BRANCH = JSON.stringify(process.env.BRANCH);
        args.ARGS = JSON.stringify(process.env.ARGS);
    }
    if (process.env.NODE_ENV === 'production') {
        return [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                    ...args
                },
            }),
            new webpack.optimize.UglifyJsPlugin({
                include: /\.js$/,
                minimize: true,
                sourceMap: true,
                compress: {
                    warnings: false,
                },
            }),
        ]
    }
    return [];
}

module.exports = {
    entry: {
        bot: path.join(__dirname, 'src', 'botPage', 'view'),
        index: path.join(__dirname, 'src', 'indexPage'),
    },
    output: {
        filename: production ? '[name].min.js' : '[name].js',
        sourceMapFilename: production ? '[name].min.js.map' : '[name].js.map',
    },
    devtool: 'source-map',
    watch: !production,
    target: 'web',
    externals: {
        CIQ: 'CIQ',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: plugins.concat(productionPlugins()),
};
