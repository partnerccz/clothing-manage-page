import Vue from 'vue'
import Vuex from 'vuex'
import {INIT_TYPE} from './action-types'
import {SET_TYPE} from './mutation-types'
import axiosIntence from '../common/axiosIntence'
// import product from './modules/productStore'
// import permission from './modules/permissionStore'
// import role from './modules/roleStore'
// import menu from './modules/menuStore'
import menuByUid from './modules/menuByUidStore'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  types: null // 这里不要使用[]做为默认值，因为null值是判断是否有加载过数据
}

const actions = {
  [INIT_TYPE] ({ commit, state }) {
    if (state.types !== null) { // 已初始化过，不需要再获取数据
      return
    }
    axiosIntence.post('/getType').then((response) => {
      commit(SET_TYPE, {types: response.data}) // 提交设置类型的变更
    })
  }
}
const mutations = {
  [SET_TYPE] (state, { types }) { // 设置类型
    state.types = types || []
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    // product,
    // permission,
    // role,
    // menu,
    menuByUid
  }
})
