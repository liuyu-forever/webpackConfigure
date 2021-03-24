const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 引入workBox
const  WorkboxWebpackPlugin = require('workbox-webpack-plugin');

/*
   多进程打包：
   - 主要应用场景：
     babel转换 (大项目，持续的babel转换)
     - 使用多进程打包会有进程开销： 1）进程启动600ms; 2) 进程通信也要时间开销
   - 安装thread-loader
     npm i thread-loader -D
   - 使用：
        {
                loader: 'thread-loader',
                options: {
                    workers: 2 // 开启两个进程
                }
         }
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
                use: [
                    /*{
                        loader: 'thread-loader',
                        options: {
                            workers: 2 // 开启两个进程
                        }
                    },*/
                    {
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
                    }
                ],

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
            },
            // 5. 多进程打包

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
