/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 王敏
 * @Date: 2021-06-29 10:59:50
 * @LastEditors: 王敏
 * @LastEditTime: 2021-06-29 11:00:47
 */
module.exports = {
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件
    extract: process.env.NODE_ENV === 'production',
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false
  },
  devServer: {
    port: 1122, // 端口号
    https: false, // https:{type:Boolean}
    hot: true, // 配置热更新
    open: true, // 配置自动启动浏览器
  },
}