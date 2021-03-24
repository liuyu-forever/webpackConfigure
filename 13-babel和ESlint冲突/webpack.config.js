const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 引入提取css文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入压缩css代码的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/*
  1) eslint是做语法检查，如果都有语法错误了，就没必要去做JS兼容处理
  2） babel会把ES6/7/8 ---> ES5，  eslint做语法检查就会有问题
  // 加上这一句： 优先执行
  enforce: 'pre',
*/

module.exports = {
   entry: './src/js/index.js',
   output: {
       filename: 'js/dist.js',
       path: resolve(__dirname, 'build')
   },
   module: {
       rules: [
           {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'eslint-loader',
               // 加上这一句： 优先执行
               enforce: 'pre',
               //  自动修复eslint语法错误
               options: {
                   fix: true
               }
           },
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
