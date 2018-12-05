// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios';
import store from './vuex/store'

// 调取公用函数内的接口函数
import { __port, __del, __hot } from '@/api'

// 按需引入elementUI
import {
  Card,
  Row,
  Col,
  Icon,
  Button,
  Input,
  InputNumber,
  Select,
  Switch,
  Form,
  Radio,
  FormItem,
  Table,
  Pagination,
  Loading,
  Message,
  MessageBox,
  Notification,
  Option,
  TableColumn,
} from 'element-ui';
Vue.use(Card);
Vue.use(Row);
Vue.use(Radio);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Switch);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(Loading);
Vue.component(Message);
Vue.use(Option);
Vue.component(MessageBox);
Vue.use(TableColumn);
Vue.component(Notification);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.config.productionTip = false;


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
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
