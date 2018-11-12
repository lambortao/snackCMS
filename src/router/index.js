import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import ElementUI from 'element-ui';
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

// 清除session
// sessionStorage.removeItem('siginInfor');

router.beforeResolve((to, from, next) => {
  // 路由监听，修改菜单定位块的位置
  // 只有检测到下面这个数组中的路由切换时才会更改菜单定位块的定位
  const routeArr = ['data', 'dataHome', 'orderList', 'productList', 'userList', 'savingsList', 'purchaseList', 'admin'];
  let routePos = routeArr.indexOf(to.name);
  if (routePos > -1) {
    routePos = routePos == 0 ? 1 : routePos;
    store.commit('setMenuPos', routePos);
  }
  
  // 监听登录
  // 检查用户登录状态是否存在
  let siginInfor = JSON.parse(sessionStorage.getItem('siginInfor'));
  
  if (siginInfor) {
    // 获取session中的时间和当前时间的时间差
    let nowTime = (new Date()).valueOf();
    let siginDuration = nowTime - siginInfor.timestamp;
    // 允许登录时间为30分钟
    let expiredTime = 30 * 60 * 1000;
    // 登录超时则需要重新登录
    if (siginDuration >= expiredTime) {
      sessionStorage.removeItem('siginInfor');
      setTimeout(()=> {
        router.push({path:'/'});
      }, 0);
    } else {
      // 登录没有超时，且当前目录是登录页面的话则进入数据页
      if (to.name == 'Login') {
        setTimeout(()=> {
          router.push({path:'/home/data'});
        }, 0);
      }
    }
  } else {
    // 没有检测到登录状态
    setTimeout(()=> {
      router.push({path:'/'});
    }, 0);
  }

  next();
})

export default router;
