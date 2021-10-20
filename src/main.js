import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/iconfont.css'
<<<<<<< HEAD
import './assets/css/reset.css'
import './assets/css/global.css'
=======
>>>>>>> 7c28455f66202b4ead0d5b8f4847278cfafe89c1

Vue.use(ElementUI);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
