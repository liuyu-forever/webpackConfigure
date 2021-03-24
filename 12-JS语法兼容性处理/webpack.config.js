const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 引入提取css文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入压缩css代码的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 让node的运行环境有生产环境--> 开发环境
// process.env.NODE_ENV = "development";

module.exports = {
   entry: './src/js/index.js',
   output: {
       filename: 'js/dist.js',
       path: resolve(__dirname, 'build')
   },
   module: {
       rules: [
           /*
             存在问题：
             一些ES6/7/8的语法， 浏览器不能够完全识别，需要做兼容性
             1） babel-loader  依赖于 @babel/core  @babel/preset-env
             npm i babel-loader @babel/core @babel/preset-env -D

             2) 引入全局的js兼容性处理 --> @babel/polyfill
             npm i @babel/polyfill -D
             存在问题：引入所有的兼容性代码 ---> 体积过大

             3）按需加载
             - 安装： npm i core-js -D

           */
           /*{
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
               options: {
                   // 预设
                   presets: ['@babel/preset-env']
               }
           }*/
           {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
               options: {
                   // 预设
                   presets: [
                       [
                           '@babel/preset-env',
                           {
                               // 按需加载
                               useBuiltIns: 'usage',
                               // 指定core-js的版本
                               corejs: {
                                   version: 3
                               },
                               // 指定兼容性做到哪个版本的浏览器
                               targets: {
                                   chrome: '60',
                                   firefox: '60',
                                   ie: '9',
                                   edge: '16',
                                   safari: '12'
                               }
                           }
                       ]
                   ]
               }
           }
       ]
   },
   plugins: [
       new HtmlWebpackPlugin({
           template: './src/index.html'
       }),
       new CleanWebpackPlugin(),
       new MiniCssExtractPlugin({
           filename: 'css/index.css',
       }),
       new OptimizeCssAssetsPlugin()
   ],
   mode: 'development',
   devServer: {
       contentBase: resolve(__dirname, 'build'),
       port: 3000,
       compress: true
   }
};
