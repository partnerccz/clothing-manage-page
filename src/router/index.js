import Vue from 'vue'
import Router from 'vue-router'
import {indexUrl} from '../common/const.js'
// import HelloWorld from '@/components/HelloWorld'
const Home = resolve => require(['../components/Home.vue'], resolve)
const Menu = resolve => require(['../components/sys/Menu'], resolve)
const Product = resolve => require(['../components/product/Index'], resolve)
const ProductColor = resolve => require(['../components/product/param/color/Index'], resolve)
const ProductSize = resolve => require(['../components/product/param/size/Index'], resolve)
const Index = resolve => require(['../components/sys/Home'], resolve)

Vue.use(Router)

export default new Router({
  model: 'history',
  routes: [
    {
      path: '/', // 首页
      name: 'Home',
      component: Home,
      redirect: indexUrl,
      children: [
        {
          path: '/index',
          name: 'Index',
          component: Index,
          meta: {
            title: 'home',
            savedPosition: 0,
            keepAlive: true // 针对不同路由设置缓存
          }
        }, {
          path: '/menu',
          name: 'Menu',
          component: Menu
        }, {
          path: '/product',
          name: 'Product',
          component: Product
        }, {
          path: '/productColor',
          name: 'ProductColor',
          component: ProductColor
        }, {
          path: '/productSize',
          name: 'ProductSize',
          component: ProductSize
        }
      ]
    }
  ]
})
