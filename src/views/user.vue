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
        stripe
        v-loading="loading">
        <el-table-column
          fixed
          type="index"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="微信昵称">
        </el-table-column>
        <el-table-column
          align="center"
          width="110"
          label="微信头像">
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
          width="100"
          style="color: #f00;">
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
            <el-button plain size="small" @click="rechargeFun(scope.row.nickName, scope.row.id)">充值</el-button>
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
      loading: true
    }
  },
  created () {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$port('user/getUserList').then(res => {
        this.userList = res;
        this.loading = false;
      });
    },
    // 充值按钮
    rechargeFun(name, id) {
      this.$prompt('请输入金额', `为${name}充值`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]*[1-9][0-9]*$/,
        inputErrorMessage: '输入正确的金额'
      }).then(({ value }) => {
        this.apiRecharge(name, id, value);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消充值'
        });       
      });
    },
    // 调用充值接口
    apiRecharge(name, id, money) {
      this.$confirm(`将为${name}充值${money}元`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$port('saving/savingNow', {
          userId: id,
          amount: money
        }).then(res => {
          if (res.status == 1) {
            this.getUserList();
            this.$message({
              message: `成功为${name}充值${money}元，余额为${res.over_money}元`,
              type: 'success'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消充值'
        });          
      });
    },
    // 删除用户
    delUser(id) {
      this.$confirm('确定删除该用户吗？此操作会删除该用户账户，且不可逆转！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$port('user/delUser', {
          'id': id
        }).then(res => {
          if (res.status == 1) {
            this.getUserList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        });
      }).catch();
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
