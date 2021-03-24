const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
       filename: 'dist.js',
       path: resolve(__dirname, 'build')
   },
   module: {
       rules: [
           {
               test: /\.css$/,
               use: [
                   'style-loader',
                   'css-loader'
               ]
           },
           // file-loader 打包其它文件资源
           {
               // 排除css/js/html
               exclude: /\.(css|js|html|json)$/,
               // npm i file-loader -D
               loader: 'file-loader'
           }
       ]
   },
   plugins: [
       new HtmlWebpackPlugin({
           template: './src/index.html'
       }),
       new CleanWebpackPlugin()
   ],
   mode: 'development'
};