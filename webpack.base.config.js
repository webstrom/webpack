const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPligin = require("clean-webpack-plugin");
const htmlwebpackplugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry:  path.join(__dirname + "/app/index.js"),//已多次提及的唯一入口文件
    output: {
        path: path.join(__dirname + "/dist"), //打包后的文件存放的地方
        filename: "js/bundle.js" //打包后输出文件的文件名
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                loaders:'style-loader!css-loader!postcss-loader',

            },
            {
                test:/\.less$/,
                loaders:'style-loader!css-loader!less-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    // 注意 1
                    fallback: {
                        loader: "style-loader"
                    },
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            },
            {
                test:/\.js$/,
                loaders:'babel-loader?presets[]=es2015',
                exclude:/node_modules/
            },
            {
                test:/\.(jpg|png)$/,
                loaders:'url-loader?limit=8192'
            }
        ]
    },
    resolve:{
        extensions:['.js','.scss','.json']
    },
    plugins:[
        // 每次重新打包时清楚原本的内容
        new CleanWebpackPligin("./dist", {
            exclude: ["index.html"]
        }),
        //打包后存放的位置
        new htmlwebpackplugin({
            title:'Hello World app',
            filename:'index.html',
            template:'app/index.html',
            inject: true
        })
    ]
};