import Vue from 'vue'
import Router from 'vue-router'
let Home = () => import('@/views/home');
let Login = () => import('@/views/login'); // 登录
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

export default new Router({
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
          name: '首页',
          alias: '/',
          component: Data
        },
        {
          path: 'data',
          name: '数据统计',
          component: Data
        },
        {
          path: 'admin',
          name: '管理员页面',
          component: Admin
        },
        {
          path: 'user',
          name: '用户列表',
          component: User
        },
        {
          path: 'order',
          name: 'order',
          component: OrderList
        },
        {
          path: 'order/detail',
          name: '订单详情',
          component: Order
        },
        {
          path: 'purchase',
          name: '采购列表',
          component: PurchaseList
        },
        {
          path: 'purchase/detail',
          name: '采购详情',
          component: Purchase
        },
        {
          path: 'savings',
          name: '储蓄列表',
          component: SavingsList
        },
        {
          path: 'savings/detail',
          name: '储蓄详情',
          component: Savings
        },
      ]
    }
  ],
  linkActiveClass: 'active'
})
