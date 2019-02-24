import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Message
} from 'element-ui'

const Login = () => import('@/components/login.vue')
const Home = () => import('@/components/home.vue')
const Users = () => import('@/components/users.vue')
const Rights = () => import('@/components/rights.vue')
const Roles = () => import('@/components/roles.vue')
const Goodslist = () => import('@/components/goodslist.vue')
const Goodsadd = () => import('@/components/goodsadd.vue')
const Reports = () => import('@/components/reports.vue')
const Orders = () => import('@/components/orders.vue')
const Params = () => import('@/components/cateparams.vue')
const Goodscate = () => import('@/components/goodscate.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: Users
    }, {
      name: 'rights',
      path: '/rights',
      component: Rights
    }, {
      name: 'roles',
      path: '/roles',
      component: Roles
    }, {
      name: 'goods',
      path: '/goods',
      component: Goodslist
    }, {
      name: 'goodsadd',
      path: '/goodsadd',
      component: Goodsadd
    }, {
      name: 'reports',
      path: '/reports',
      component: Reports
    }, {
      name: 'orders',
      path: '/orders',
      component: Orders
    }, {
      name: 'params',
      path: '/params',
      component: Params
    }, {
      name: 'categories',
      path: '/categories',
      component: Goodscate
    }]
  }, {
    name: 'login',
    path: '/login',
    component: Login
  }]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({
        name: 'login'
      })
      Message.warning('先登录啊小老弟')
      return
    }
    next()
  }
})

export default router
