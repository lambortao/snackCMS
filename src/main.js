// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false

// iview的导入
import { 
  Button,
  Layout,
  Table,
  Icon,
  Grid,
  Menu,
  Card,
  Tabs,
  Dropdown,
  Input,
  Radio,
  Checkbox,
  Select,
  Sider } from 'iview';
Vue.component('Button', Button);
Vue.component('Layout', Layout);
Vue.component('Table', Table);
Vue.component('Icon', Icon);
Vue.component('Grid', Grid);
Vue.component('Menu', Menu);
Vue.component('Card', Card);
Vue.component('Tabs', Tabs);
Vue.component('Dropdown', Dropdown);
Vue.component('Radio', Radio);
Vue.component('Checkbox', Checkbox);
Vue.component('Input', Input);
Vue.component('Select', Select);
Vue.component('Sider', Sider);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
