// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import ElementUI from 'element-ui'
import HttpSever from '@/http.js'
import '@/assets/css/baes.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(HttpSever)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.filter('fmtdata', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
