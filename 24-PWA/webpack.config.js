const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 引入workBox
const  WorkboxWebpackPlugin = require('workbox-webpack-plugin');

/*
   PWA: 渐进式网络应用开发程序(离线可访问)
   workbox --> workbox-webpack-plugin
   - 安装： workbox-webpack-plugin
   - 引入 ：  const  WorkboxWebpackPlugin = require('workbox-webpack-plugin');
   - 使用：
     new WorkboxWebpackPlugin.GenerateSW({
            // 1. 快速启动serverWorker
            clientsClaim: true,
            // 2. 快速生成/快速删除
            skipWaiting: true
        })

    - 在入口文件中配置：
        if('serviceWorker' in navigator){
            window.addEventListener('load', ()=>{
                 navigator.serviceWorker.register('/service-worker.js').then(()=>{
                      console.log('注册serviceWorker成功！')
                 }).catch(()=>{
                     console.log('注册serviceWorker失败！')
                 })
            })
       }

   - 安装服务端
   - npm i serve -g
   - 运行： serve -s build --- > 5000端口


*/

// 公共的代码
const commonCssLoader = [
    // MiniCssExtractPlugin.loader,
    {
       loader:  MiniCssExtractPlugin.loader,
       options: {
           publicPath: '../'
       }
    },
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: (loader) => [
                require('postcss-preset-env')()
            ]
        }
    }
];

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/dist.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // 1. 样式相关
            {
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            },
            // 2. JS相关
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
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
            },
            // 3. 图片相关
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 60 * 1024,
                    name: '[hash:12].[name]',
                    outputPath: 'img'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // 4. 其它资源
            {
                exclude: /\.(js|json|css|less|jpg|png|gif|html)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:12].[ext]',
                    outputPath: 'source'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/index.css',
        }),
        new OptimizeCssAssetsPlugin(),
        new WorkboxWebpackPlugin.GenerateSW({
            // 1. 快速启动serverWorker
            clientsClaim: true,
            // 2. 快速生成/快速删除
            skipWaiting: true
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        port: 3000,
        compress: true
    }
};
