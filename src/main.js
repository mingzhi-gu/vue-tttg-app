import Vue from 'vue';
// import Vant from 'vant';
import { Toast, Dialog } from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vant/lib/index.css';
import 'lib-flexible';
import axios from './api/axios';
import './plugins/vant';

Vue.config.productionTip = false;
Vue.prototype.$Dialog = Dialog;
Vue.prototype.$Toast = Toast;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
