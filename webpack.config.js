const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.js', '.html'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {configFileName: path.resolve(__dirname, 'tsconfig.json')},
                    } ,
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule: true,
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: false,
            favicon: './src/favicon.svg',
        }),
        new webpack.DefinePlugin({
            SERVER_ORIGIN: "'http://127.0.0.1:5000'"
        })
    ],
};
