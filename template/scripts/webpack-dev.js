/**
 * @file 测试渲染页面的webpack配置
 */

const path = require('path');
const webpack = require('webpack');
// const {spawn} = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {PORT, webpackConfig} = require('./base');
const getDefaultModules = require('./webpack-loader');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {VueLoaderPlugin} = require('vue-loader');
// const devMode = process.env.NODE_ENV === 'development';

const config = Object.assign({}, webpackConfig, {
    mode: 'development',
    target: 'web',
    entry: {
        index: [
            './src/pages/index'
        ]
    },
    output: Object.assign(webpackConfig.output, {
        path: path.join(process.cwd(), 'assets')
    }),
    devServer: {
        disableHostCheck: true,
        compress: true,
        host: '0.0.0.0',
        noInfo: false,
        contentBase: './assets/',
        historyApiFallback: true,
        hot: true,
        port: PORT,
        stats: {
            colors: true
        },
        proxy: {
            '/app': {
                target: 'http://test.baidu.com:8141',
                pathRewrite: {},
                changeOrigin: true,
                secure: false
            },
            '*': {
                bypass(req, res, proxyOptions) {
                    // 代理html路由至相应文件
                    if (req.headers.accept.indexOf('html') !== -1) {
                        const path = req.path;
                        console.log(path);
                        // 例：/developer/home/pay.html /developer/index.html
                        const matchedResult = /^\/minapp([\/\s\S]*)(\/[\s\S]*.html)$/.exec(path);
                        if (!matchedResult) {
                            return;
                        }
                        return '/index.html';
                    }
                    else {
                        const path = req.path;
                        console.log(path);
                    }
                }
            }
        }
    },
    cache: true,
    devtool: 'eval-source-map',
    module: getDefaultModules(),
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/public/template/default.tpl',
            chunks: ['index']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new VueLoaderPlugin()
    ]
});

config.module.rules.push({
    test: /\.js$/,
    use: [
        'babel-loader',
        // path.resolve(__dirname, './lazyLoader.js')
    ],
    include: [
        path.join(process.cwd(), 'src'),
        path.join(process.cwd(), 'node_modules/ele')
    ]
});

module.exports = config;
