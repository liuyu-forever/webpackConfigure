const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 公共的代码
const commonCssLoader = [
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
        // 常规操作
        filename: 'js/[name].js',
        path: resolve(__dirname, 'build'),
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
                // 优先执行
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
        })
    ],
    mode: 'development',
    devServer: {
        // 1. 基础配置
        contentBase: resolve(__dirname, 'build'),
        port: 3000,
        compress: true,
        open: true, // 自动打开浏览器
        hot: true, // HMR

        // 2. 常用配置
        host: 'localhost', // 配置域名
        watchContentBase: true, // 监视contentBase目录下的所有文件，一旦改变则

        watchOptions: {
            // 忽略文件
            ignored: /node_modules/
        },

        // 3. 配置代理服务器 ---> 开发环境的跨域问题
        proxy: {
            // 一旦devServer（3000端口）服务器接收到 /api/xxx 的请求， 就会把请求转发到另一个服务器(8080)
            //  http://localhost:8080/news  /api/news   /api/list  http://localhost:8080/news
            '/api': {
                target: 'http://localhost:8080',
                // 发送请求时，会做路径重写  /api/xxx --> /xxx
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
