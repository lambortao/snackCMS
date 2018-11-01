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
        :data="dataList.show"
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
          width="100">
          <template slot-scope="scope">
            <p style="color: #F56C6C; font-weight: bold;">￥{{scope.row.over_money}}</p>
          </template>
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
        :current-page="page.nowPage" 
        :page-sizes="page.pageNumberArr"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: '',
      value: '',
      userList: [],
      loading: true,
      /**
       * 翻页
       * 参数一：初始的显示的页码
       * 参数二：总数据量
       * 参数三：每页显示的数据量
       * 参数四：当前页面显示的数据量，默认是每页显示数据量的第一个
       */
      page: {
        nowPage: 1,
        total: 0,
        pageNumberArr: [20, 40, 60, 100],
        nowPageNumber: ''
      },
      /**
       * 数据列表
       * all - 从后台返回来的全部的数据
       * select - 下拉列表筛选后的数据
       * show - 当前页面显示的数据
       * all > select > show
       * 页面上显示的始终都是show的数据
       * 
       * 这里讲一下实现逻辑，默认进来下拉筛选的数据等于全部数据，当前页面显示的数据是根据默认的翻页数据处理后显示的数据
       * 下拉筛选修改后会重置翻页数据，并重新计算数据总数
       */
      dataList: {
        all: [],
        show: []
      }
    }
  },
  created () {
    this.getUserList();
    this.page.nowPageNumber = this.page.pageNumberArr[0];
  },
  methods: {
    getUserList() {
      this.$port('user/getUserList').then(res => {
        this.loading = false;
        // 获取到全部数据之后，默认情况下筛选的数据就是全部数据
        this.dataList.all = res;
        this.dataList.show = this.dataList.all;
        // 计算数据总量
        this.page.total = this.dataList.show.length;
        // 初始重置翻页函数
        this.pageFun(0, this.page.nowPageNumber);
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
          nickName: name,
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
    /**
     * 分页函数
     * 第一个参数是当前页码，第二个参数是单页显示的数量
     */
    pageFun(pagePosition, pageNumber) {
      // 当前页面要显示的数据头 = 当前页码 * 单页显示的数量
      pagePosition = pagePosition * pageNumber;
      // 当前页面要显示的数据尾 = 当前页面要显示的数据头 + 单页显示的数量
      pageNumber = pagePosition + pageNumber;
      // 然后截取当前页面要显示的数据头到当前页面要显示的数据尾之间的数据
      let lsPageData = this.dataList.all.slice(pagePosition, pageNumber);
      // 清空显示的数据再重新赋值
      this.dataList.show = [];
      this.dataList.show = lsPageData;
    },
    // 修改每页显示数量
    handleSizeChange(val) {
      // 循环查找一下，当前选择的数据量是变量中的第几个，然后通过变量进行赋值
      // 数量修改完毕后，重置翻页函数
      this.page.pageNumberArr.forEach((element, key) => {
        if (val == element) {
          this.page.nowPageNumber = this.page.pageNumberArr[key];
          this.pageFun(0, this.page.nowPageNumber);
        }
      });      
    },
    // 跳转到第几页
    handleCurrentChange(val) {
      this.pageFun(val - 1, this.page.nowPageNumber);
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
