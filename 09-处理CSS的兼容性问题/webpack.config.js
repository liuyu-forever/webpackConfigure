const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 引入提取css文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
           // 1. 样式资源文件打包
           {
               test: /\.css$/,
               use: [
                   /*'style-loader',*/
                   MiniCssExtractPlugin.loader,
                   'css-loader',
                   // 配置postcss-loader
                   {
                      loader: 'postcss-loader',
                       options: {
                           ident: 'postcss',
                           plugins: (loader) => [
                               require('postcss-preset-env')()
                           ]
                       }
                   }
               ]
           },
           {
               test: /\.less$/,
               use: [
                   'style-loader',
                   'css-loader',
                   'less-loader'
               ]
           },
           // 2. 配置图片资源打包
           {
               test: /\.(jpg|png|gif)$/,
               loader: 'url-loader',
               options: {
                   limit: 10 * 1024,
                   name: '[hash:12].[ext]',
                   // 设置输出的文件夹
                   outputPath: 'img'
               }
           },
           {
             test: /\.html$/,
             loader: 'html-loader'
           },
           // 3. 其它资源
           {
               exclude: /\.(css|js|json|less|jpg|png|gif|html)/,
               loader: 'file-loader',
               options: {
                   name: '[hash:12].[ext]',
                   // 设置输出的文件夹
                   outputPath: 'source'
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
       })
   ],
   mode: 'production',
   devServer: {
       contentBase: resolve(__dirname, 'build'),
       port: 3000,
       compress: true
   }
};
