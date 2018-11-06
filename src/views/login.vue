<template>
  <div id="login">
    <section class="login-box">
      <figure class="logo"><img src="@/assets/logo.png" alt="LOGO"></figure>
      <div class="input-box">
        <input type="text" name="userName" id="userName" placeholder="输入登录名" v-model="login.userName">
        <input type="password" name="password" id="password" placeholder="输入登录密码" v-model="login.password">
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
      button: '登录',
      login: {
        userName: '',
        password: ''
      }
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
    color: #ededed;
  }
}
figure.logo{
  width: 160px;
  margin: 0 auto 20px auto;

  img{
    width: 100%;
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
  border: 1px solid #eee;
  border-radius: 5px;
  outline: none;
  color: #000;
  font-size: 1.25em;
}
input[type='text'],
input[type='password']{
  padding: 0 10px;
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
