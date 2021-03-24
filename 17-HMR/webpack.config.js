const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/*
   HMR:
   1) 样式文件 可以使用HMR功能，前提是: style-loader
   2) HTML文件，不可以使用HMR功能
    解决：修改入口
    entry: [
            './src/js/index.js', './src/index.html'
        ]
   3） js文件， 不可以使用HMR功能
   解决： 修改JS代码
*/

// 公共的代码
const commonCssLoader = [
    'style-loader',
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
    // entry: './src/js/index.js',
    entry: [
        './src/js/index.js', './src/index.html'
    ],
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
        compress: true,
        // 开启热更新
        hot: true
    }
};
