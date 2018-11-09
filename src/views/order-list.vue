<template>
  <div id="orderList">
    <header>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-select v-model="userSelect.value" placeholder="选择用户" @change="changeUser()">
            <el-option
              v-for="item in userSelect.options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" :offset="16">
          <el-input prefix-icon="el-icon-search" v-model="findContent" placeholder="仅限用户和商品"></el-input>
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
          width="40"
          align="center">
          <template slot-scope="scope">
            <p>{{scope.row.id}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="购买人">
        </el-table-column>
        <el-table-column
          prop="pro_name"
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="pro_Price"
          label="价格">
          <template slot-scope="scope">
            <p style="color: #F56C6C; font-weight: bold;">￥{{ scope.row.pro_Price }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="购买日期"
          width="200">
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="结算日期"
          width="200">
        </el-table-column>
        <el-table-column
          prop="order_type"
          width="120"
          align="center"
          label="是否预付费">
          <template slot-scope="scope">
            <p>{{ scope.row.order_type ? '是' : '否' }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.end_time == null" plain size="small" @click="settlement(scope.row.id, scope.row.pro_Price, scope.row.user_name)">结算</el-button>
            <el-button v-else disabled plain size="small">已结算</el-button>
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
      <div v-if="wjs.show" class="wjs">
        <p style="color: #F56C6C;font-size: 1.25em;font-weight: bold;">未结算金额：￥{{wjs.money}}</p>
        <el-button v-if="wjs.money == 0" disabled plain size="small">已全部结算</el-button>
        <el-button v-else plain size="small" @click="settlement()">全部结算</el-button>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wjs: {
        show: false,
        money: 0,
        name: ''
      },
      findContent: '',
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
       * 筛选
       * 参数一：选中的数据
       * 参数二：全部数据
       */
      userSelect: {
        value: '',
        options: [{
          id: 0,
          name: '全部用户'
        }]
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
        select: [],
        show: []
      }
    }
  },
  created () {
    this.getOrderList();
    this.page.nowPageNumber = this.page.pageNumberArr[0];
  },
  methods: {
    // 获取订单列表
    getOrderList() {
      this.$port('order/getOrderList').then(res => {
        // 去除加载loading
        this.loading = false;
        // 获取到全部数据之后，默认情况下筛选的数据就是全部数据
        this.dataList.all = res;
        this.dataList.select = this.dataList.all;
        // 计算数据总量
        this.page.total = this.dataList.select.length;
        // 初始计算当前一共有多少用户
        this.filterUser(this.dataList.select);
        // 初始重置翻页函数
        this.pageFun(0, this.page.nowPageNumber);
        this.changeUser();
      });
    },
    // 把数据中的用户筛选出来，显示到选择框
    filterUser(orderList) {
      let nowUserArr = [];
      this.userSelect.options = [{
        id: 0,
        name: '全部用户'
      }];
      orderList.forEach(element => {
        if (nowUserArr.indexOf(element.user_id) == -1) {
          nowUserArr.push(element.user_id);
          let nowUser = {
            id: element.user_id,
            name: element.user_name
          }
          this.userSelect.options.push(nowUser);
        }
      });
    },
    // 用户筛选
    changeUser() {
      let lsOrder = [];
      // 如果选择的是0，代表选择的是全部
      if (this.userSelect.value == 0) {
        this.wjs.show = false;
        this.dataList.select = this.dataList.all;
      } else {
        // 否则就进行筛选
        this.dataList.all.forEach(element => {
          if (element.user_id == this.userSelect.value) {
            lsOrder.push(element);
          }
        });
        this.dataList.select = [];
        this.dataList.select = lsOrder;

        // 计算当前用户的未结算金额
        this.wjs.money = 0;
        this.dataList.select.forEach(element => {
          if (!element.end_time) {
            this.wjs.name = element.user_name;
            this.wjs.money += parseFloat(element.pro_Price);
          }
        });
        this.wjs.show = true;
      }
      // 用户筛选后需要重新计算总数据量和重置翻页函数
      this.page.total = this.dataList.select.length;
      this.pageFun(0, this.page.nowPageNumber);
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
      let lsPageData = this.dataList.select.slice(pagePosition, pageNumber);
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
    },
    // 结算
    settlement(orderId, money, name) {
      let orderArr = [];
      let orderMoney = 0;
      let userName = '';
      if (orderId) {
        orderArr.push(orderId);
        orderMoney = money;
        userName = name;
      } else {
        this.dataList.select.forEach(element => {
          if (!element.end_time) {
            orderArr.push(element.id);
          }
        });
        orderMoney = this.wjs.money;
        userName = this.wjs.name;
      }

      this.$confirm(`将为${userName}结算${orderMoney}元`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$port('order/settlement', {
          orderList: orderArr
        }).then(res => {
          if (res.status == 1) {
            this.getOrderList();
            this.$message({
              message: `成功为${userName}结算${orderMoney}元`,
              type: 'success'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消结算'
        });          
      });
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
footer{
  display: flex;
  justify-content: space-between;
  align-items: center;

  .wjs{
    p{
      display: inline-block;
      margin-right: 20px;
    }
  }
}
</style>
