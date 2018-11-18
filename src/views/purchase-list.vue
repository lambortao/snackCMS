<template>
  <div id="purchaseList">
    <header>
      <el-row :gutter="5">
        <el-col :span="3">
          <el-button @click="newPurchase()" style="width: 100%;" type="primary" plain icon="el-icon-circle-plus-outline">新增进货单</el-button>
        </el-col>
        <el-col :span="4">
          <el-select v-model="userSelect.value" placeholder="筛选订单" @change="changePurchase()">
            <el-option
              v-for="item in userSelect.options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" :offset="13">
          <el-input prefix-icon="el-icon-search" v-model="findContent" placeholder="仅限商品"></el-input>
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
          prop="pro_name"
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="source"
          label="进货渠道">
        </el-table-column>
        <el-table-column
          prop="time"
          label="采购日期">
        </el-table-column>
        <el-table-column
          prop="num"
          label="进货数量">
        </el-table-column>
        <el-table-column
          label="购入单价">
          <template slot-scope="scope">
            <p style="color: #F56C6C; font-weight: bold;">￥{{ scope.row.buy_price }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="预售单价">
          <template slot-scope="scope">
            <p style="color: #F56C6C; font-weight: bold;">￥{{ scope.row.sell_price }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="单品利润">
          <template slot-scope="scope">
            <p>价格：￥{{ ((scope.row.sell_price * 10) - (scope.row.buy_price * 10)) / 10 }}元</p>
            <p>百分比：{{ (((scope.row.sell_price * 10) - (scope.row.buy_price * 10)) * 10) / scope.row.sell_price }}%</p>
          </template>
        </el-table-column>
        <el-table-column
          label="单次进货利润">
          <template slot-scope="scope">
            <p>￥{{ (((scope.row.sell_price * 10) - (scope.row.buy_price * 10)) / 10) * scope.row.num }}元</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="arrive"
          label="是否到货"
          align="center"
          width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.arrive" @click="confirmArrivals(scope.row.id, scope.row.pro_id, scope.row.num)" type="primary" plain>确认到货</el-button>
            <p v-else>已到货</p>
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
          name: '全部订单'
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
    this.getPurchaseList();
    this.page.nowPageNumber = this.page.pageNumberArr[0];
  },
  methods: {
    // 获取采购列表
    getPurchaseList() {
      this.$port('purchase/getPurchaseList').then(res => {
        this.loading = false;
        if (res) {
          this.dataList.all = res;
          this.dataList.select = this.dataList.all;
          // 计算数据总量
          this.page.total = this.dataList.select.length;
          // 初始计算当前一共有多少用户
          this.filterUser(this.dataList.select);
          // 初始重置翻页函数
          this.pageFun(0, this.page.nowPageNumber);
        }
      });
    },
    // 进入新建采购单
    newPurchase() {
      this.$router.push({path:'purchase/detail'});
    },
    // 确认到货
    confirmArrivals(id, pro_id, num) {
      this.$confirm('是否确认已经到货？确认后采购数将并入库存', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$port('purchase/confirmArrivals', {
          'id': id,
          'pro_id': pro_id,
          'num': num
        }).then(res => {
          if (res.status == 1) {
            this.getPurchaseList();
            this.$message({
              message: '已确认到货，采购数已并入库存',
              type: 'success'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消确认'
        });          
      });
    },
    // 把数据中的用户筛选出来，显示到选择框
    filterUser(purchaseList) {
      let nowUserArr = [];
      purchaseList.forEach(element => {
        if (nowUserArr.indexOf(element.pro_id) == -1) {
          nowUserArr.push(element.pro_id);
          let nowUser = {
            id: element.pro_id,
            name: element.pro_name
          }
          this.userSelect.options.push(nowUser);
        }
      });
    },
    // 用户筛选
    changePurchase() {
      let lsOrder = [];
      // 如果选择的是0，代表选择的是全部
      if (this.userSelect.value == 0) {
        this.dataList.select = this.dataList.all;
      } else {
        // 否则就进行筛选
        this.dataList.all.forEach(element => {
          if (element.pro_id == this.userSelect.value) {
            lsOrder.push(element);
          }
        });
        this.dataList.select = [];
        this.dataList.select = lsOrder;
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