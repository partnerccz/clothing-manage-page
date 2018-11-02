// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axiosIntence from './common/axiosIntence'
import {ajaxPrefix} from './common/const.js'

/*
上传地址
上传后返回fileName 文件名
*/
Vue.prototype._uploadFilePath = ajaxPrefix + '/common/upload'

Vue.config.productionTip = false
Vue.prototype.$http = axiosIntence
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
