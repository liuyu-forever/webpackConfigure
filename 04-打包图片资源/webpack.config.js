/*
  webpack的配置文件
  指示webpack去具体执行哪些操作
  遵循nodeJS的commonJS规范
*/
const {resolve} = require('path');
// 1. 引入
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
            {
                test: /\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // 处理图片资源
            {
                test: /\.(jpg|png|gif)$/,
                // url-loader 依赖于 file-loader
                loader: 'url-loader',
                options: {
                    // 图片的大小 < 60kb, 就进行base64的处理
                    /*
                      优点：减少请求的数量， 减轻服务器端的开销
                      缺点： 文件请求速度变慢
                    */
                    limit: 60 * 1024,

                    // 给图片重命名
                    name: '[hash:24].[ext]'
                }
            },
            // 处理模板文件中引入的图片资源
            {
                test: /\.html$/,
                // html-loader 负责引入img url-loader就能处理了！
                loader: 'html-loader',
            }
        ]
    },
    // plugin的配置
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 在打包之前，删除整个目标文件夹中的内容
        // clean-webpack-plugin
        new CleanWebpackPlugin()
    ],
    //  模式
    mode: 'development',
    // mode: 'production'
};