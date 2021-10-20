<<<<<<< HEAD
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/fonts/iconfont.css";
import "./assets/css/reset.css";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

import TreeTable from 'vue-table-with-tree-grid'
Vue.use(VueQuillEditor);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.component('tree-table', TreeTable)
// 时间过滤器
Vue.filter("dateFromat", function(originVal) {
  const dt = new Date(originVal);

  // 年月日
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + 1 + "").padStart(2, "0");

  // 时分秒
  const hh = (dt.getHours() + 1 + "").padStart(2, "0");
  const mm = (dt.getMinutes() + 1 + "").padStart(2, "0");
  const ss = (dt.getSeconds() + 1 + "").padStart(2, "0");

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
=======
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
>>>>>>> fbd7a4b09f0ba97ec4eca68c5e96b2b76ce15ec2
