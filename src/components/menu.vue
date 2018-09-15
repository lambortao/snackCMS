<template>
  <div class="nav">
    <nav>
      <router-link tag="p" :to="{path: '/home/'+item.url}" v-for="(item, $index) in navData">
        <i :style="{backgroundImage: 'url(' + require(`../assets/${item.icon}`) + ')'}"></i>{{item.name}}
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
      navData: {
        'data': {
          name: '数据',
          icon: '@/assets/icon/6.png',
          url: 'data'
        },
        'order': {
          name: '订单',
          icon: '@/assets/icon/1.png',
          url: 'order'
        },
        'user': {
          name: '用户',
          icon: '@/assets/icon/5.png',
          url: 'user'
        },
        'savings': {
          name: '充值',
          icon: '@/assets/icon/2.png',
          url: 'savings'
        },
        'purchase': {
          name: '采购',
          icon: '@/assets/icon/3.png',
          url: 'purchase'
        },
        'admin': {
          name: '设置',
          icon: '@/assets/icon/4.png',
          url: 'admin'
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/methods.scss';

.nav{
  width: 200px;
  height: 100%;
  border-right: 1px solid $borderColor;
  background-color: #fff;
}
</style>
