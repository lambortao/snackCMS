import Vue from 'vue'
import Router from 'vue-router'
let Home = () => import('@/views/home');
let Login = () => import('@/views/login'); // 登录
let ProductList = () => import('@/views/product-list');
let Product = () => import('@/views/product');
let OrderList = () => import('@/views/order-list'); // 订单列表
let Order = () => import('@/views/order'); // 订单详情页
let PurchaseList = () => import('@/views/purchase-list'); // 采购列表
let Purchase = () => import('@/views/purchase'); // 采购详情页
let SavingsList = () => import('@/views/savings-list'); // 储蓄列表
let Savings = () => import('@/views/savings'); // 储蓄详情页
let User = () => import('@/views/user'); // 用户列表页
let Admin = () => import('@/views/admin'); // 管理员控制页
let Data = () => import('@/views/data'); // 首页 - 数据统计显示

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/data',
          name: 'data',
          alias: '/',
          component: Data
        },
        {
          path: 'data',
          name: 'dataHome',
          component: Data
        },
        {
          path: 'admin',
          name: 'admin',
          component: Admin
        },
        {
          path: 'product',
          name: 'productList',
          component: ProductList
        },
        {
          path: 'product/detail/:id',
          name: 'product',
          component: Product
        },
        {
          path: 'user',
          name: 'userList',
          component: User
        },
        {
          path: 'order',
          name: 'orderList',
          component: OrderList
        },
        {
          path: 'order/detail',
          name: 'orderDetail',
          component: Order
        },
        {
          path: 'purchase',
          name: 'purchaseList',
          component: PurchaseList
        },
        {
          path: 'purchase/detail',
          name: 'purchaseDetail',
          component: Purchase
        },
        {
          path: 'savings',
          name: 'savingsList',
          component: SavingsList
        },
        {
          path: 'savings/detail',
          name: 'savingsDetail',
          component: Savings
        },
      ]
    }
  ],
  linkActiveClass: 'active'
});

import store from '@/vuex/store'

router.beforeResolve((to, from, next) => {
  const routeArr = ['data', 'dataHome', 'orderList', 'productList', 'userList', 'savingsList', 'purchaseList', 'admin'];
  let routePos = routeArr.indexOf(to.name);
  if (routePos > -1) {
    store.commit('setMenuPos', routePos);
  }
  next();
})

export default router;
