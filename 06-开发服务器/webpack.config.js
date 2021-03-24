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
   mode: 'development',
   devServer: {
       // 项目构建后的路径
       contentBase: resolve(__dirname, 'build'),
       // 启动的端口号
       port: 3000,
       // 自动打开浏览器
       // open: true
       // 启用gzip压缩
       compress: true
   }
};

/*
   npm i webpack-dev-server -D
   webpack-dev-server: 开发服务器
   - 自动化 (自动编译、自动打开浏览器、自动刷新浏览器、……)
   - 特点： 只会在内存中打包、不会任何的真实输出
   - 启动服务器 npx webpack-dev-server
*/