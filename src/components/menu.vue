<template>
  <div class="nav">
    <nav>
       <div v-for="(item, key, $index) in navData" @click="selectTop = $index" :key="item.id">
          <router-link tag="p" :to="{path: '/home/' + key}">
            <i :style="{backgroundImage: 'url('+require(`../assets/${item.icon}`) + ')'}"></i>{{item.name}}
          </router-link>
       </div>
      <span class="select" :style="{transform: `translateY(${selectTop * 50}px)`}"></span>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectTop: 0,
      navData: {
        'data': {
          name: '数据',
          icon: 'icon/6.png',
          url: 'data',
          position: 0
        },
        'order': {
          name: '订单',
          icon: 'icon/1.png',
          url: 'order',
          position: 1
        },
        'product': {
          name: '商品',
          icon: 'icon/7.png',
          url: 'product',
          position: 2
        },
        'user': {
          name: '用户',
          icon: 'icon/5.png',
          url: 'user',
          position: 3
        },
        'savings': {
          name: '充值',
          icon: 'icon/2.png',
          url: 'savings',
          position: 4
        },
        'purchase': {
          name: '采购',
          icon: 'icon/3.png',
          url: 'purchase',
          position: 5
        },
        'admin': {
          name: '设置',
          icon: 'icon/4.png',
          url: 'admin',
          position: 6
        }
      }
    }
  },
  created () {
    this.setRoutePosition();
  },
  methods: {
    setRoutePosition() {
      let nowRouteAll = this.$route.path;
      let nowRoute = nowRouteAll.split('/');
      if (this.navData[nowRoute[nowRoute.length - 1]]) {
        this.selectTop = this.navData[nowRoute[nowRoute.length - 1]]['position'];
      }
    }
  },
  computed: {
    getFooter () {
      return this.$store.getters.getMenuPos;
      // this.selectTop = this.$store.getters.getMenuPos;
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/methods.scss';

.nav{
  width: 180px;
  height: 100%;
  border-right: 1px solid $borderColor;
  background-color: #fff;
  padding: 20px 0;

  nav{
    position: relative;
  }

  div{
    width: 100%;
    height: 50px;
    position: relative;
    z-index: 2;

    p{
      width: 100%;
      height: 100%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 0;

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

  span{
    position: absolute;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    background-color: #fafafa;
    border-top: 1px solid $borderColor;
    border-bottom: 1px solid $borderColor;
    transition: all 300ms;

    &:after{
      content: '';
      position: absolute;
      right: -1px;
      top: 0px;
      height: 100%;
      width: 2px;
      background-color: #fafafa;
    }
  }
}
</style>
