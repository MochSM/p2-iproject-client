import VueToast from 'vue-toast-notification';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast, {
  position: 'top-right',
  queue: true,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
