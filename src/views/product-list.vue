<template>
  <div id="productList">
    <header>
      <el-row :gutter="5">
        <el-col :span="3">
          <el-button @click="addProduct()" style="width: 100%;" type="primary" plain icon="el-icon-circle-plus-outline">新增商品</el-button>
        </el-col>
        <el-col :span="4" :offset="17">
          <el-input prefix-icon="el-icon-search" v-model="input" placeholder="仅限商品"></el-input>
        </el-col>
      </el-row>
    </header>
    <section>
      <el-table
        :data="newProductList"
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
              inactive-color="#ff4949" 
              @change="shelf(scope.row.id, scope.row.sell)">
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
            <el-button plain size="small" @click="hotFun(scope.row.id, true)" v-if="scope.row.hot == 0">顶</el-button>
            <el-button plain size="small" @click="hotFun(scope.row.id, false)" v-else class="hot">落</el-button>
            <el-button plain size="small" type="danger" @click="delFun(scope.row.id)">删</el-button>
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
      loading: false,
      currentPage: 1,
      input: '',
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
      this.loading = true;
      this.$port('product/getProductList').then((res) => {
        this.newProductList = res;
        this.newProductLength = res.length;
        this.loading = false;
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 新增商品
    addProduct() {
      this.$router.push({path:'product/detail?id=123'});
    },
    // 上架或者下架商品
    shelf(index, row) {
      this.$port('product/changeShelf', {
        'shelf': row,
        'id': index
      }).then(res => {
        if (res.status == 1) {
          let msg = row ? '已上架' : '已下架';
          this.$notify({
            title: msg,
            type: 'success'
          });
        }
      })
    },
    // 删除商品
    delFun(id) {
      this.$confirm('确定删除该商品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$port('product/delProduct', {
          'id': id
        }).then(res => {
          if (res.status == 1) {
            this.getProductList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        });
      }).catch();
    },
    // 置顶商品
    hotFun(id, bool) {
      this.$port('product/hotProduct', {
        'id': id,
        'hot': bool,
      }).then(res => {
        if (res.status == 1) {
          let msg = bool ? '已置顶' : '已取消置顶';
          this.$notify({
            title: msg,
            type: 'success'
          });
          this.getProductList();
        }
      })
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
.hot{
  color: #f00;
  border-color: #f00;
}
</style>