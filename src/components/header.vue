<template>
  <header id="header">
    <img src="../assets/logo.png" alt="希望小卖铺">
  </header>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/methods.scss';

header{
  height: 60px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid $borderColor;
  box-shadow: 0 4px 10px 0 rgba(0,0,0,.05);
  z-index: 2;

  img{
    height: 30px;
  }
}
</style>

