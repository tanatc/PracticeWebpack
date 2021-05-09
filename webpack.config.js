/**
 * webpack.config.js:webpack的配置文件
 * 所有工具都是基于node。js平台运行，模块化默认采用commonJs
 * 
 * 1、模块  下载、使用
 * 2、插件  下载、引入、使用
 * 
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { template } = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    // 入口起点
    entry: './src/js/index.js',
    output: {
        // 输出文件名
        filename: 'js/built.js',
        // 输出路径
        // __dirname node.js的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build'),
        publicPath: './'

    },
    // loader的配置
    module: {
        rules: [
            // 详细loader配置
            {
                test: /\.css$/,
                use: [
                    // user数组中loader执行顺序：从右到左，从下到上依次执行
                    // 创建style标签，将js中的样式资源插入，添加到head中生效
                    // 'style-loader',
                    // 这个loader取代stryle-loader，生成css文件
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // outputPath: 'css',
                            publicPath: '../'
                        }

                    },
                    // 将css文件变成commonjs模块加入到js中，里面内容是字符串
                    { loader: 'css-loader' }
                    /**
                     * css兼容性处理：postcss ---》 postcss-loader post-preset-env
                     */
                    /**
                     * 压缩css
                     */
                ],


            },
            {
                test: /\.less$/,
                // 要使用多个loader用user处理
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                // 下载url-loader、file-loader
                // 使用一个loader
                // 处理样式文件中url图片
                loader: 'url-loader',
                options: {
                    // 图片大小小于8kb就会被base64处理
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 8 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonJs解析，解析时会出问题
                    // 解决：关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    // 给图片重命名，取图片的hash前10位，
                    // [ext]取原来文件名
                    name: "[hash:10].[ext]",
                    outputPath: 'img',
                },

            },
            {
                test: /\.html$/,
                // 处理html中img图片（负责引入，从而能被url处理）
                loader: 'html-loader',
                options: {
                    esModule: false,

                }

            },
            {
                exclude: /\.(css|js|html|less|png|gif|jpg)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'font'
                }
            }
        ]
    },
    // plugins的配置
    plugins: [
        // html-webpack-plugin
        // 默认创建一个空html，自动引入打包输出的所有资源
        new HtmlWebpackPlugin({
            // 复制 路径处文件，并自动引入打包输入的所有资源
            template: './src/index.html',
            minify: {
                // 移除空格
                // collapseWhitespace: true,
                // 移除注释
                // removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: 'css/build.css',
        }),
        // css压缩
        // new OptimizeCssAssetsWebpackPlugin()
    ],
    // 模式
    // mode: 'production', //生产模式
    mode: 'development',
    // 开发服务器devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    // 特点：只会在内存中编译打包，不会有任何输出
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 8080,
        open: true,
        hot: true

    },
    target: 'web'
}