/**
 * @file 基础配置文件
 */
/* eslint  global-require: 0 */
const path = require('path');

const cwd = process.cwd();
const devMode = process.env.NODE_ENV === 'development';


const Config = {
    PORT: 3000,
    webpackConfig: {
        mode: devMode ? 'development' : 'production',
        target: 'electron-renderer',
        devtool: 'eval',
        entry: {
            index: [
                './src/pages/index'
            ]
        },
        output: {
            path: path.join(cwd, 'dist'),
            filename: '[name].js',
            publicPath: devMode ? '/' : '',
            chunkFilename: '[name].js'
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                $component: path.resolve('./src', 'components'),
                $pages: path.resolve('./src', 'pages'),
                $utils: path.resolve('./src', 'utils'),
                $routes: path.resolve('./src', 'routes'),
                $public: path.resolve('./src', 'public'),
                $config: path.resolve('./src', 'config')
            }
        }
    }
};
module.exports = Config;
