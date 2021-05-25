const path = require('path');

module.exports = {
    entry: ['./src/stylablez/functions/layers.ts'],
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'stylizables.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
