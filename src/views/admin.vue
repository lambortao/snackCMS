<template>
  <div id="admin">
    <el-button plain type="danger" @click="outSigin()">注销登录</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    outSigin() {
      this.$confirm('是否注销登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('siginInfor');
        this.$router.push({path:'/'});
      }).catch(() => {});
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
