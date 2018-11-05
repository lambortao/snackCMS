<template>
  <div id="login">
    <section class="login-box">
      <h3>{{ title }}</h3>
      <div class="input-box">
        <input type="text" name="userName" id="userName" placeholder="输入登录名">
        <input type="password" name="password" id="password" placeholder="输入登录密码">
        <input type="button" :value="button">
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: 'WELCOME',
      button: '登录'
    }
  }
}
</script>

<style lang="scss" scoped>
#login{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: {
    image: url('https://placeimg.com/640/480/any');
    size: cover;
    position: center;
  }
}
h3{
  font-size: 1.75em;
  color: #303133;
}
input{
  display: block;
  width: 260px;
  height: 40px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  outline: none;
}
input[type='text'],
input[type='password']{
  padding: 0 5px;
  border: 1px solid #E4E7ED;
}
input[type='button']{
  background-color: #409EFF;
  color: #fff;
  cursor: pointer;
  transition: all 300ms;

  &:active{
    transform: scale(0.95);
  }
}
</style>
