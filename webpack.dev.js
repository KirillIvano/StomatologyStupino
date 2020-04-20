const merge = require('webpack-merge');
const {common} = require('./webpack.config');

const dev = {
    devServer: {
        historyApiFallback: true,
        hotOnly: true,
        contentBase: path.resolve(__dirname, 'dist'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(c|le)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            import: true,
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|ico)$/,
                use: 'url-loader',
            },

        ],

    },
};

module.exports = merge(common, dev);
