<template>
  <div id="productList">
    <header>
      <el-row :gutter="5">
        <el-col :span="3">
          <el-button @click="addProduct()" style="width: 100%;" type="primary" plain icon="el-icon-circle-plus-outline">新增商品</el-button>
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
        :data="newProductList"
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
          prop="name"
          label="商品名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          label="上架"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.sell"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="采购"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button plain size="small">点击采购</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center">
          <template slot-scope="scope">
            <el-button plain size="small">改</el-button>
            <el-button plain size="small">顶</el-button>
            <el-button plain size="small" type="danger">删</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next"
        :total="newProductLength">
      </el-pagination>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
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
      newProductList: [],
      newProductLength: 0
    }
  },
  created () {
    this.getProductList();
  },
  methods: {
    getProductList () {
      this.$port('product/getProductList').then((res) => {
        this.newProductList = res;
        this.newProductLength = res.length;
        console.log(res.length);
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addProduct() {
      this.$router.push({path:'product/detail?id=123'});
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