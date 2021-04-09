import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import skylightswitch from "../lib/kyui.common.js"
// import skylightswitch from "../skylight-package/switch/index.js"
Vue.use(skylightswitch);


import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;

Vue.use(Antd);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
