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
              语法检查： 安装 eslint 和 eslint-loader
              npm i eslint  eslint-loader eslint-plugin-import  eslint-config-airbnb-base -D
              注意：语法检查，不要检查三方的
           */
           {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'eslint-loader',
               //  自动修复eslint语法错误
               options: {
                   fix: true
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
