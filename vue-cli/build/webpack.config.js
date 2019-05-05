const path = require('path');
module.exports = {
  node: 'development',
  entry: {
    // 配置入口文件
    main: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    // 配置打包文件 输出的目录
    path: path.resolve(__dirname, '../dist'),
    fileName: 'js/[name].[hash:8].js', //生成的js文件
    chunkName: 'js/[name].[hash:8].js', // 生成的chunk名称
    publicPath: './', //资源引用的路径
  }
}