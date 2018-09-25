const webpack = require('webpack');
const WebpackDevServerOutput = require("webpack-dev-server-output");
const baseConfig = require("./webpack.base.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlwebpackplugin = require('html-webpack-plugin');
//开发模式
baseConfig.mode = 'development';

//html文件引入路径
baseConfig.output.publicPath = './';

// 方便追踪源代码中的错误
baseConfig.devtool = "source-map";
// 服务配置
baseConfig.devServer = {
    // 发布服务的文件夹
    contentBase: "./dist",
    host: "127.0.0.1",
    port: 8066,
    // 声明为热替换
    //hot: true,
    inline: true, //实时刷新
    // 第一次打包时打开浏览器
    open: true,
    // 与output中的内容保持一致
    publicPath: "/dist"
};
baseConfig.plugins.push(
    ...[
        new ExtractTextPlugin('css/[name].css'),
        new webpack.NamedModulesPlugin(),
        // 热替换插件
        new webpack.HotModuleReplacementPlugin(),
        // 将webpack-dev-server在内存中打包的文件输出为本地文件
        new WebpackDevServerOutput({
            path: "./dist",
            isDel: true
        })
    ]
);

module.exports = baseConfig;
