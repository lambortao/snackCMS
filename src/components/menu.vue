<template>
  <div class="nav">
    <nav>
       <!-- = `${($index * 50)}px` -->
       <div v-for="(item, key, $index) in navData" @click="selectTop = `${($index * 50)}px`">
          <router-link tag="p" :to="{path: '/home/' + key}">
            <i :style="{backgroundImage: 'url('+require(`../assets/${item.icon}`) + ')'}"></i>{{item.name}}
          </router-link>
       </div>
      <span class="select" :style="{transform: `translateY(${selectTop})`}"></span>
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
          url: 'data'
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
