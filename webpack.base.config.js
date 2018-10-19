const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPligin = require("clean-webpack-plugin");
const htmlwebpackplugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCssWebpack = require('purifycss-webpack');
const glob = require('glob');
module.exports = {
    //已多次提及的唯一入口文件
    entry:  {
        "index":path.join(__dirname + "/app/index/index.js"),
        "rotate":path.join(__dirname+"/app/rotate/rotate.js")
    },
    output: {
        path: path.join(__dirname + "/dist"), //打包后的文件存放的地方
        publicPath:'./'
    },
    module:{
        rules:[
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader',
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            },
            { // loader sass and css
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader?modules=false',
                        options: {
                            modules:false,
                            importLoaders: 1,
                            minimize: true,
                            localIdentName: '[name]__[local]-[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, './postcss.config.js'),
                            }
                        }
                    },
                    "sass-loader"
                ],
                exclude:/node_modules/
            },
            {
                test:/\.js$/,
                loaders:'babel-loader?presets[]=es2015',
                exclude:/node_modules/
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=images/[name]-[hash:8].[ext]',
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            },
            {
                test: /\.pug$/,
                use: ['html-loader','pug-html-loader'],
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            }
        ]
    },
    resolve:{
        extensions:['.js','.scss','.json']
    },
    externals: {
        // 包名: window全局对象,
        echarts: 'echarts',
        vue: 'Vue',
        'vue-router':'VueRouter',
        axios: 'axios',
        lodash: '_',
        nprogress: 'NProgress',
        'jquery': 'jQuery',
    },
    optimization:{
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    plugins:[
        require('autoprefixer'),
        //消除未使用的css
        new PurifyCssWebpack({
            //消除冗余代码
            // 首先保证找路径不是异步的,所以这里用同步的方法
            // path.join()也是path里面的方法,主要用来合并路径的
            // 'src/*.html' 表示扫描每个html的css
            paths:glob.sync(path.join(__dirname,'dist/*.html'))
        }),
        // 每次重新打包时清楚原本的内容
        new CleanWebpackPligin("./dist", {
            exclude: ["index.html","rotate.html"]
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name].css',
            chunkFilename:'[name].css'
        }),
        //打包后存放的位置
        new htmlwebpackplugin({
            //title:'Hello World app',
            //生成的网页HTML文件的文件名，注意可以利用/来控制文件目录结构的，其最终生成的路径，是基于webpack配置中的output.path的
            filename:'index.html',
            //指定一个基于某种模板引擎语法的模板文件，html-webpack-plugin默认支持ejs格式的模板文件，如果你想使用其它格式的模板文件，那么需要在webpack配置里设置好相应的loader，比如handlebars-loader啊html-loader啊之类的。如果不指定这个参数，html-webpack-plugin会使用一份默认的ejs模板进行渲染。如果你做的是简单的SPA应用，那么这个参数不指定也行，但对于多页应用来说，我们就依赖模板引擎给我们拼装页面了，所以这个参数非常重要。
            template:'app/index/index.pug',
            //指示把加载js文件用的<script>插入到哪里，默认是插到<body>的末端，如果设置为'head'，则把<script>插入到<head>里
            inject: true,
            //在由html-webpack-plugin负责加载的js/css文件的网址末尾加个URL参数，此URL参数的值是代表本次编译的一个hash值，每次编译后该hash值都会变化，属于缓存解决方案
            hash:true,
            //生成压缩后的HTML代码
            //minify:true,
            //以数组的形式指定由html-webpack-plugin负责加载的chunk文件（打包后生成的js文件），不指定的话就会加载所有的chunk。
            chunks:['index','commons']
        }),
        new htmlwebpackplugin({
            //title:'Hello',
            filename:'rotate.html',
            template:'app/rotate/rotate.pug',
            inject: true,
            hash:true,
            //minify:true,
            chunks:['rotate','commons']
        })
    ]
};