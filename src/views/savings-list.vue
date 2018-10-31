<template>
  <div id="savingsList">
    <header>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-button type="primary" plain icon="el-icon-circle-plus-outline">充值</el-button>
        </el-col>
        <el-col :span="4" :offset="16">
          <el-input prefix-icon="el-icon-search" v-model="input" placeholder="仅限用户"></el-input>
        </el-col>
      </el-row>
    </header>
    <section>
      <el-table
        :data="savingsList"
        style="width: 100%"
        border 
        stripe
        v-loading="loading">
        <el-table-column
          fixed
          type="index"
          width="40"
          align="center">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="被充值人昵称">
        </el-table-column>
        <el-table-column
          prop="money"
          label="充值金额">
          <template slot-scope="scope">
            <p style="color: #F56C6C; font-weight: bold;">￥{{scope.row.money}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="real_money"
          label="实时余额">
          <template slot-scope="scope">
            <p style="color: #F56C6C; font-weight: bold;">￥{{scope.row.real_money}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="操作时间">
        </el-table-column>
      </el-table>
    </section>
    <footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="30"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      input: '',
      value: '',
      loading: true,
      savingsList: []
    }
  },
  created() {
    this.getSavingList();
  },
  methods: {
    getSavingList() {
      this.$port('saving/getSavingList').then(res => {
        this.savingsList = res;
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/methods.scss';
section{
  margin: 20px 0;
  padding: 20px 0;
  border-top: 1px solid $hr;
  border-bottom: 1px solid $hr;
}
</style>