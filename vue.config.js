module.exports = {
    publicPath: './',
    devServer: {
      proxy: {
        '/api': {
<<<<<<< HEAD
          target: 'http://192.168.1.5:8888/api/private/v1',//API服务器的地址
=======
<<<<<<< HEAD
          // target: 'http://192.168.1.14:8888/api/private/v1',//API服务器的地址
          target: 'http://localhost:8888/api/private/v1',//API服务器的地址
=======
          target: 'http://192.168.1.27:8888/api/private/v1',//API服务器的地址
>>>>>>> 7c28455f66202b4ead0d5b8f4847278cfafe89c1
>>>>>>> fbd7a4b09f0ba97ec4eca68c5e96b2b76ce15ec2
          changeOrigin: true,// 是否跨域
          pathRewrite: {
            '^/api': '' //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          }
        }
      }
    }
  }