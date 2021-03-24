const {resolve} = require('path');
// 1. 引入
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dist.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [

        ]
    },
    // plugin的配置
    plugins:[
       // html-webpack-plugin
       new HtmlWebpackPlugin({
           template: './src/index.html'
       })
    ],
    //  模式
    mode: 'development',
    // mode: 'production'
};