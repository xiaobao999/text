// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import CusBread from '@/components/cusBread.vue'
import ELEMENT from 'element-ui'
import HttpSever from '@/http.js'
import '@/assets/css/baes.css'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.use(HttpSever)
Vue.config.productionTip = false
Vue.use(ELEMENT)
Vue.filter('fmtdata', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
Vue.component(CusBread.name, CusBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
