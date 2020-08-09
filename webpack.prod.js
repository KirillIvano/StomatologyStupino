const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJs = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const commonConfig = require('./webpack.config');

const prodConfigs = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimizer: [
            new TerserJs(),
            new OptimizeCssAssetsPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            chunkFilename: '[id].css',
        }),
        new ImageminPlugin({
            bail: false, // Ignore errors on corrupted images
            cache: true,
            exclude: 'favicon.svg',
            imageminOptions: {
              // Before using imagemin plugins make sure you have added them in `package.json` (`devDependencies`) and installed them
      
              // Lossless optimization with custom option
              // Feel free to experiment with options for better result for you
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["jpegtran", { progressive: true }],
                ["pngquant", { quality: [0.1, 0.3]}],
                [
                  "svgo",
                  {
                    plugins: [
                      {
                        removeViewBox: false
                      }
                    ]
                  }
                ]
              ]
            }
          })
    ],
    module: {
        rules: [
            {
                test: /\.(c|le)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer(),
                            ],
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            emitFile: true,
                            outputPath: 'images/',
                            name: '[name].[ext]'
                        }
                    },
                ],
            },
        ],
    },
};

console.log(merge(commonConfig, prodConfigs))

module.exports = merge(commonConfig, prodConfigs);