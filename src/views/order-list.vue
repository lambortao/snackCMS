<template>
  <div id="orderList">
    <header>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-select v-model="value" placeholder="选择用户">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" :offset="16">
          <el-input prefix-icon="el-icon-search" v-model="input" placeholder="仅限用户和商品"></el-input>
        </el-col>
      </el-row>
    </header>
    <section>
      <el-table
        :data="orderList"
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
          label="购买日期">
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="结算日期"
          width="300">
        </el-table-column>
        <el-table-column
          prop="order_type"
          label="是否预付费">
          <template slot-scope="scope">
            <p>{{ scope.row.order_type ? '是' : '否' }}</p>
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      orderList: [],
      loading: true
    }
  },
  created () {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.$port('order/getOrderList').then(res => {
        this.orderList = res;
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
