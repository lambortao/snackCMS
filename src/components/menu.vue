<template>
  <div class="nav">
    <nav>
      <router-link tag="p" :to="{path: '/home/'+item.url}" v-for="(item, $index) in navData">
        <i :style="{backgroundImage: 'url('+require(`../assets/${item.icon}`) + ')'}"></i>{{item.name}}
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
          icon: 'icon/6.png',
          url: ''
        },
        'order': {
          name: '订单',
          icon: 'icon/1.png',
          url: 'order'
        },
        'user': {
          name: '用户',
          icon: 'icon/5.png',
          url: 'user'
        },
        'savings': {
          name: '充值',
          icon: 'icon/2.png',
          url: 'savings'
        },
        'purchase': {
          name: '采购',
          icon: 'icon/3.png',
          url: 'purchase'
        },
        'admin': {
          name: '设置',
          icon: 'icon/4.png',
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
  padding: 20px 0;

  p{
    width: 100%;
    height: 40px;
    margin: 5px 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    i{
      display: inline-block;
      width: 25px;
      height: 25px;
      margin-right: 8px;
      background: {
        size: cover;
        repeat: no-repeat;
      }
    }
  }
}
</style>
