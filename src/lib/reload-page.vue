<template>
  <el-button 
  type="primary" 
  icon="el-icon-refresh" 
  @click="reload">刷新数据</el-button>
</template>
<script>
export default {
  methods: {
    reload() {
      this.$confirm('是否重新获取此页面的信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('reloadpage');
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });          
      });
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
