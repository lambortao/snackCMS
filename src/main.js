// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios';

// 调取公用函数内的接口函数
import { __port, __del, __hot } from '@/api'

Vue.config.productionTip = false
Vue.use(ElementUI);

// 全局注册
Vue.prototype.$port = __port;
Vue.prototype.$del = __del;
Vue.prototype.$hot = __hot;
Vue.prototype.$http = axios;
Vue.urlHost = 'http://server.zytao.cc/snackcms/admin.php/';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
