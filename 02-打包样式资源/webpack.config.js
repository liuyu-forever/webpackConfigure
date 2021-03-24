/*
  webpack的配置文件
  指示webpack去具体执行哪些操作
  遵循nodeJS的commonJS规范
*/
const {resolve} = require('path');

module.exports = {
    // 入口
    entry: './src/index.js',
    // 出口
    output: {
        // 输出的文件名
        filename: 'dist.js',
        // 输出路径 （绝对路径）
        path: resolve(__dirname, 'build')
    },
    // loader的配置
    module: {
        // 规则
        rules: [
            {
                // 匹配哪些文件
                test: /\.css$/,
                // 使用哪些loader来处理这些匹配到的css文件
                use: [
                    // use中loader的加载顺序： 从下到上，从右到左，依次执行
                    // 创建style标签，将js中的样式资源添加到页面的头部标签中
                    'style-loader',
                    // 将css文件转成commonJS模块， 加载到js中， 内容都是“样式字符串”
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    // 把less的代码转成css的代码
                    // less less-loader
                    'less-loader'
                ]
            }
        ]
    },
    // plugin的配置
    plugins:[

    ],
    //  模式
    mode: 'development',
    // mode: 'production'
};