const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
            '@': path.resolve(__dirname, './src'),
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
            {
                test: /\.(c|le)ss$/,
                exclude: path.resolve(__dirname, 'src/app'),
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: false,
            favicon: './src/favicon.svg',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
    ],
};
