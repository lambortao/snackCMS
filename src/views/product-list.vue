<template>
  <div id="productList">
    <header>
      <el-row :gutter="5">
        <el-col :span="3">
          <el-button @click="addProduct()" style="width: 100%;" type="primary" plain icon="el-icon-circle-plus-outline">新增商品</el-button>
        </el-col>
        <el-col :span="2">
          <reloadPage @reloadpage="getProductList"></reloadPage>
        </el-col>
        <el-col :span="4" :offset="15">
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
            <el-button plain size="small" @click="updateFun(scope.row.id)">改</el-button>
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
        :current-page="page.nowPage" 
        :page-sizes="page.pageNumberArr"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </footer>
  </div>
</template>
<script>
import reloadPage from '@/lib/reload-page';

export default {
  data() {
    return {
      loading: false,
      findContent: '',
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
  components: {
    reloadPage
  },
  created () {
    this.getProductList();
    this.page.nowPageNumber = this.page.pageNumberArr[0];
  },
  methods: {
    getProductList () {
      this.loading = true;
      this.$port('product/getProductList').then((res) => {
        this.loading = false;
        // 获取到全部数据之后，默认情况下筛选的数据就是全部数据
        this.dataList.all = res;
        this.dataList.show = this.dataList.all;
        // 计算数据总量
        this.page.total = this.dataList.show.length;
        // 初始重置翻页函数
        this.pageFun(0, this.page.nowPageNumber);
      })
    },
    // 进入商品详情页
    updateFun(id) {
      this.$router.push({path: `product/detail/${id}`});
    },
    // 新增商品
    addProduct() {
      this.$router.push({path:'product/detail/add'});
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
.hot{
  color: #f00;
  border-color: #f00;
}
</style>