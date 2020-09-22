const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const pathToIndexHtml = require.resolve("./src/index.html");

module.exports = {
    entry: {
        main: './src/main.ts',
        'service-worker': './src/service-worker.ts',
        'index': pathToIndexHtml,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WorkboxPlugin.InjectManifest({
            swSrc: './src/service-worker.ts',
        })
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: pathToIndexHtml,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]'
                        }
                    },
                    "extract-loader",
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src", "link:href"]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "file-loader",
                    "extract-loader",
                    "css-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    },
    mode: "development"
};
