import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Finance from '../views/Finance.vue'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/finance',
    name: 'finance',
    component: Finance
  }

]

const router = new VueRouter({
  mode: 'history',
  base: '/baseguide/',//process.env.BASE_URL,
  routes
})



export default router
