<template>
  <div id="purchaseList">
    <header>
      <el-row :gutter="5">
        <el-col :span="3">
          <el-button style="width: 100%;" type="primary" plain icon="el-icon-circle-plus-outline">新增进货单</el-button>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value" placeholder="筛选商品">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" :offset="13">
          <el-input prefix-icon="el-icon-search" v-model="input" placeholder="仅限商品"></el-input>
        </el-col>
      </el-row>
    </header>
    <section>
      <el-table
        :data="pruchaseList"
        style="width: 100%"
        border 
        stripe>
        <el-table-column
          fixed
          type="index"
          width="40"
          align="center">
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
            <el-button v-if="scope.row.arrive" type="primary" plain>确认到货</el-button>
            <p v-else>已到货</p>
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
      pruchaseList: []
    }
  },
  created () {
    this.getPurchaseList();
  },
  methods: {
    getPurchaseList() {
      this.$port('purchase/getPurchaseList').then(res => {
        this.pruchaseList = res;
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