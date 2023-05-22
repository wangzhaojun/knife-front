// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import '@babel/polyfill';
import Vue from 'vue';
import App from 'components/App';

import heyuiConfig from 'js/config/heyui-config';
import routerConfig from 'js/config/router-config';
import store from 'js/vuex/store';
import 'js/vue/filters';

require('./css/app.less');

require('./mock/index');



heyuiConfig();
Vue.use(HeyUI);

const router = routerConfig();

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
