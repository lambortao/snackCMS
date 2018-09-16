<template>
  <div>
    <Header></Header>
    <div id="home">
      <Menu></Menu>
      <div class="main">
        <transition name="fade">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header';
import Menu from '@/components/menu';

export default {
  components: {
    Header,
    Menu
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/methods.scss';

#home{
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #fafafa;
  display: flex;
  justify-content: space-between;
  z-index: 1;

  .main{
    width: calc(100vw - 180px);
    overflow-x: hidden;
    overflow-y: scroll;
    position: relative;
    padding: 20px;

    > div{
      width: calc(100vw - 220px);
      position: absolute;
      padding: 20px;
      background-color: #fff;
      border: 1px solid $borderColor;
      border-radius: 3px;
      flex: 1;
    }
  }
}
.fade-enter-active,
.fade-leave-active{
  transition: all 200ms ease;
}
.fade-enter{
  opacity: 0;
  transform: translateY(5px);
}
.fade-enter-to,
.fade-leave{
  opacity: 1;
  transform: translateY(0px);
}
.fade-leave-to{
  opacity: 0;
  transform: translateY(-5px);
}
</style>