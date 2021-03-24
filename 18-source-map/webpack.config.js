const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


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
                    // fix: true
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
        new OptimizeCssAssetsPlugin()
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        port: 3000,
        compress: true
    },
    devtool: 'cheap-source-map'
};
/*
   source-map: 生成源代码到构建后代码的映射， 映射--> 精准定位错误
   [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

   source-map 外部映射
   - 找出源代码错误位置（文件和具体哪一个位置）

   inline-source-map  内联映射
   - 找出源代码错误位置（文件和具体哪一个位置）

   hidden-source-map 外部映射
   - 不能找出源代码错误位置（文件和具体哪一个位置）， 只能在构建代码里面去定位

   eval-source-map  内联映射
    - 找出源代码错误位置（文件和具体哪一个位置）

   nosources-source-map 外部映射
   - 能够输出错误的具体文件， 但是源文件被隐藏

   cheap-source-map 外部映射
   cheap-module-source-map 外部映射
   - 错误所在的行和列

   开发环境： 调试友好，构建速度快
   （eval > inline > cheap > ...）
   eval-source-map /  eval-cheap-source-map

   生成环境： 隐藏源代码（调试不友好）， 代码体积小
   nosources-source-map

 */
