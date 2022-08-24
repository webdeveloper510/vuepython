import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios';
import store from '@/store'
import VueCookies from 'vue-cookies';
import "@mdi/font/css/materialdesignicons.css";
import Toasted from 'vue-toasted';

Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.use(VueCookies);
Vue.use(Toasted, {
  duration: 1500,
  position: 'top-right',
  theme: 'outline',
})
// global components
Vue.component()

new Vue({
  vuetify,
  router,
  store,

  render: h => h(App)
}).$mount('#app')
