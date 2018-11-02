'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEV_PORT: 8022,
  DEV_HOST: 'localhost',
  // 后端服务的访问地址，用于代理ajax数据请求
  BACKEND_SERVER: 'http://localhost:8023'
})
