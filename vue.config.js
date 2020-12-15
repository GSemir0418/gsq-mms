module.exports = {
    devServer: {
        port: 8002,
        host: "localhost",
        https: false,
        open: true,
        proxy: {//开发环境代理配置
            // '/dev-api': {
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_SERVICE_URL,
                changeOrigin: true,//开启代理服务器
                pathRewrite: {
                    // /dev-api/db.json最终会发送http://localhost:8001/db.json
                    // '^/dev-api': '',//将请求地址前缀/dev-api替换为空
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },

    lintOnSave: false,
    productionSourceMap: false
}