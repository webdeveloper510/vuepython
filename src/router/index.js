import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Finance from '../views/Finance.vue'
import login from '../views/login.vue'

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
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }

]


// router.beforeEach(async (to) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   //const publicPages = ['/login'];
//   const authRequired = localStorage.getItem('user');

//   if (authRequired) {
//      console.log(to.fullPath);
//       router.push('/login');
//   }
// });

const router = new VueRouter({
  mode: 'history',
  base: '/baseguide/',//process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  //localStorage.removeItem("user");
  console.log(localStorage.getItem('user'))
  if (localStorage.getItem('user')==null && to.name!='login') {

    next({ name: 'login' })
  } else {
    console.log('fsfsdfsd333')
    next() // go to wherever I'm going
  }

})



export default router
