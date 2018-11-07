<template>
  <div id="login">
    <section class="login-box">
      <figure class="logo"><img src="@/assets/logo.png" alt="LOGO"></figure>
      <div class="input-box">
        <input 
          :class="{error: errorBool}" 
          type="text" 
          name="userName" 
          id="userName" 
          :placeholder="urnContent" 
          v-model="login.userName" 
          @focus="errorBool = false">
        <input 
          :class="{error: errorBool}" 
          type="password" 
          name="password" 
          id="password" 
          :placeholder="pwdContent" 
          v-model="login.password" 
          @focus="errorBool = false"
          @keyup.enter="signIn()">
        <el-button class="sigin" type="primary" @click="signIn()" :loading="siginLoading">{{ button }}</el-button>
        <b></b>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      urnContent: '输入登录名',
      pwdContent: '输入登录密码',
      button: '登录',
      errorBool: false,
      siginLoading: false,
      login: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    signIn() {
      if (this.login.userName == '' || this.login.password == '') {
        this.urnContent = '用户名不能为空';
        this.pwdContent = '登录密码不能为空';
        this.errorBool = true;
        return;
      }
      this.siginLoading = true;
      this.button = '登陆中...';
      this.$port('admin/signin', this.login).then(res => {
        if (res.status == 1) {
          this.button = '登陆成功';
          this.siginLoading = false;
          this.$message({
            message: '欢迎回来~',
            type: 'success'
          });
          setTimeout(()=>{
            this.$router.push({path:'home/data/'});
          }, 500);
        }
      });
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
input[type='text'],
input[type='password']{
  display: block;
  width: 260px;
  height: 40px;
  margin: 10px 0;
  border: 1px solid #eee;
  border-radius: 5px;
  outline: none;
  color: #000;
  font-size: 1.25em;
  transition: all 300ms;
  padding: 0 10px;
  border: 1px solid #E4E7ED;
}
.sigin{
  width: 100%;
  background-color: #409EFF;
  color: #fff;
  cursor: pointer;
  transition: all 100ms;

  &:active{
    transform: scale(0.95);
  }
}
input.error{
  color: #F56C6C;
  border-color: #F56C6C;
}
</style>
