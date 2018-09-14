<template>
  <div>
    <Header></Header>
    <div id="home">
      <Menu></Menu>
      <transition name="fade">
        <router-view class="main" />
      </transition>
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
#home{
  width: 100%;
  height: calc(100vh - 60px);
  background-color: #fafafa;
  display: flex;
  justify-content: space-between;

  .main{
    width: calc(100vw - 60px);
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 20px;
  }
}
.fade-enter-active,
.fade-leave-active{
  transition: all 300ms ease;
}
.fade-enter{
  opacity: 0;
}
.fade-enter-to,
.fade-leave{
  opacity: 1;
}
.fade-leave-to{
  opacity: 0;
}
</style>