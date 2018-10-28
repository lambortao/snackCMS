<template>
  <div id="user">
    <header>
      <el-row :gutter="10">
        <el-col :span="4" :offset="20">
          <el-input prefix-icon="el-icon-search" v-model="input" placeholder="仅限用户"></el-input>
        </el-col>
      </el-row>
    </header>
    <section>
      <el-table
        :data="userList"
        style="width: 100%"
        border 
        stripe>
        <el-table-column
          fixed
          type="index"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称">
        </el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="头像">
          <template slot-scope="scope">
            <img class="avatar-box" :src="scope.row.avatarUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="openid"
          label="openid">
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="手机号">
        </el-table-column>
        <el-table-column
          width="280"
          label="时间">
          <template slot-scope="scope">
            <p><b>首次注册时间：</b>{{scope.row.first_time}}</p>
            <p><b>最后登录时间：</b>{{scope.row.last_time}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="over_money"
          label="余额"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          label="消费记录"
          width="150"
          align="center">
          <template slot-scope="scope">
            <el-button plain size="small">点击查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center">
          <template slot-scope="scope">
            <el-button plain size="small" @click="rechargeFun(scope.row.id)">充值</el-button>
            <el-button plain size="small" type="danger" @click="delUser(scope.row.id)">删除</el-button>
          </template>
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
      userList: [],
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  created () {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$port('user/getUserList').then(res => {
        this.userList = res;
      });
    },
    // 充值
    rechargeFun() {
      // 充值用弹窗的形式展现
    },  
    // 删除用户
    delUser() {

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
.avatar-box{
  width: 80px;
  height: 80px;
}
</style>
