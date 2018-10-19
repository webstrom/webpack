const webpack = require('webpack');
const WebpackDevServerOutput = require("webpack-dev-server-output");
const baseConfig = require("./webpack.base.config");
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//开发模式
baseConfig.mode = 'development';

//html文件引入路径
baseConfig.output.publicPath = './';

// 方便追踪源代码中的错误
baseConfig.devtool = "source-map";
//打包后输出文件的文件名
baseConfig.output.filename = "js/[name].js";
// 服务配置
baseConfig.devServer = {
    // 发布服务的文件夹
    contentBase: "./dist",
    host: "127.0.0.1",
    port: 8077,
    // 声明为热替换
    //hot: true,
    //实时刷新
    inline: true,
    // 第一次打包时打开浏览器
    open: true,
    // 与output中的内容保持一致
    publicPath: "/dist"
};
baseConfig.plugins.push(
    ...[
        require('autoprefixer'),
        new webpack.NamedModulesPlugin(),
        // 热替换插件
        new webpack.HotModuleReplacementPlugin(),
        // 将webpack-dev-server在内存中打包的文件输出为本地文件
        new WebpackDevServerOutput({
            path: "./dist",
            isDel: true
        }),
        new BundleAnalyzerPlugin({
            //  可以是`server`，`static`或`disabled`。
            //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
            //  在“静态”模式下，会生成带有报告的单个HTML文件。
            //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
            analyzerMode: 'server',
            //  将在“服务器”模式下使用的主机启动HTTP服务器。
            analyzerHost: '127.0.0.1',
            //  将在“服务器”模式下使用的端口启动HTTP服务器。
            analyzerPort: 8888,
            //  路径捆绑，将在`static`模式下生成的报告文件。
            //  相对于捆绑输出目录。
            reportFilename: 'report.html',
            //  模块大小默认显示在报告中。
            //  应该是`stat`，`parsed`或者`gzip`中的一个。
            //  有关更多信息，请参见“定义”一节。
            defaultSizes: 'parsed',

            //  在默认浏览器中自动打开报告
            openAnalyzer: true,
            //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
            generateStatsFile: false,
            //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
            //  相对于捆绑输出目录。
            statsFilename: 'stats.json',
            //  stats.toJson（）方法的选项。
            //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
            //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            statsOptions: null,
            logLevel: 'info' //日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
        })
    ]
);

module.exports = baseConfig;
