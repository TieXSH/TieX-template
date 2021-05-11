/**
 * @file webpack打包配置
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');


const {webpackConfig} = require('./base');
const getDefaultModules = require('./webpack-loader');


const config = Object.assign({}, webpackConfig, {
    mode: 'production',
    entry: {
        index: path.join(process.cwd(), 'src/pages/index')
    },
    cache: false,
    devtool: false,
    module: getDefaultModules(),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/public/template/default.tpl',
            chunks: ['index']
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new VueLoaderPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                include: path.join(process.cwd(), 'src'),
                cache: true,
                parallel: true, // 开启并行压缩，充分利用cpu
                sourceMap: false,
                extractComments: false, // 移除注释
                uglifyOptions: {
                    compress: true,
                    warnings: false,
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
});

config.module.rules.push({
    test: /\.js$/,
    use: [
        'babel-loader'
        // path.resolve(__dirname, './lazyLoader.js')
    ],
    include: [
        path.join(process.cwd(), 'src')
    ]
});

module.exports = config;
