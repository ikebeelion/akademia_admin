const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:'https://akademiaapi.herokuapp.com/api'
  }
})
