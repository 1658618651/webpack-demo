const path=require('path');
const autoprefixer=require('autoprefixer');
module.exports={
    //热更新：1.需要模式是development
    // 2.需要人口文件，因为监视的是1.js，如果他内部依赖的模块变了，他才会变
    // 3.监视output的path，里面的东西变了，要监视到
    mode:'development',
    // entry:{
    //     index:'./src/js/1.js',
    //     admin:'./src/js/2.js'
    // },
    entry:'./src/js/1.js',
    output:{
    path:path.resolve(__dirname,'build'),
    // filename:'[name].min.js'//[name]代表index，admin
    filename:'bundle.min.js'
    },
    module:{
        rules:[
            {
            test:/\.js$/i,
            loader:'eslint-loader',
            exclude:/node_modules/,
            options:{
                
            }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader','postcss-loader'],
                //如何检查这些东西，完了怎么使用,css-loader只是让webpack认识，但是不能起如何作用
                //style-loader让样式变成style标签
                //loader文件原理：1.读取这个文件2.处理
                //losder 就是替webpack去预处理这个文件，把这个文件处理成webpack能认的状态
                //顺序很重要，从后往前执行
                //postcss-loader加载css,并解析里面的每一个样式,他需要一个配置文件
                //autoprefixer根据浏览器的各种情况，内置了浏览器的兼容表，来选择兼容前缀
            },
            {
                test:/\.(jpg|png|gif)$/i,
                use:{
                // loader:"file-loader",
                // //file-loader是万能的，可以编译各种文件，如图片，css文件，读取并输出文件
                // //url-loader:读取并输出base64
                // options:{
                //     outputPath:'images/'
                // }
                loader:'url-loader',
                options:{
                outputPath:'images/',
                limit:32*1024//1k一下作为base64存在，大于的作为文件存在，为0则为file-loader
                }
                }
            },
            {
                test:/\.less$/i,use:['style-loader','css-loader','less-loader']
            },
            {
                test: /\.jsx?/i,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
                //exclude里面的东西不要编译
            }
        ]
    },
    devtool:"source-map"//保持代码原样
}
// 为了速度起见，dev-server编译的结果并不会写到磁盘上，会编译到内存里，所以为什么磁盘上文件没有改变，网络上变了
//webpack-dev-derver只能写在script里