// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
//安装命令npm install vuex --save    状态管理vuex（封装猴的）
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //此举使用this.$store property
 store,
  components: { App },
  template: '<App/>'
})
