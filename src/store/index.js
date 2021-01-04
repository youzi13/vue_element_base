import Vue from 'vue'
import vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(vuex);
// 引入子模块
import app from './modules/app'
import tab from './modules/tab'
import iframe from './modules/iframe'
import user from './modules/user'
import menu from './modules/menu'

const store = new vuex.Store({
  plugins: [createPersistedState({
      storage: window.sessionStorage
      })],
    modules: {
        app: app
        ,tab: tab
        ,user: user
        ,menu: menu
        ,iframe:iframe
    }
})

export default store