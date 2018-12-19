<template>
  <div id="user">
    <header>
      <el-row :gutter="10">
        <el-col :span="2">
          <reloadPage @reloadpage="getSMSList"></reloadPage>
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
          width="60"
          align="center">
          <template slot-scope="scope">
            <p>{{scope.row.id}}</p>
          </template>
        </el-table-column>
        <el-table-column
          width="210"
          label="短信ID">
          <template slot-scope="scope">
            <p v-if="scope.row.code_id">{{ scope.row.code_id }}</p>
            <p v-else style="color: #F56C6C;font-weight: bold;">发送失败</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="短信内容">
        </el-table-column>
        <el-table-column
          prop="time"
          width="160"
          label="发送时间">
        </el-table-column>
        <el-table-column
          width="160"
          label="反馈结果">
          <template slot-scope="scope">
            <p v-if="scope.row.callback_code == 0" style="color: #409EFF;font-weight: bold;">{{ scope.row.text }}</p>
            <p v-else style="color: #F56C6C;font-weight: bold;">{{ scope.row.text }}</p>
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
        pageNumberArr: [20, 40, 60],
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
    this.getSMSList();
    this.page.nowPageNumber = this.page.pageNumberArr[0];
  },
  components: {
    reloadPage
  },
  methods: {
    callbackCode(code) {
      let endContent = '';
      switch(code){
        case '0': 
          endContent = '发送成功';
          break;
        case '9997': 
          endContent = '号码超频';
          break;
        case '10000': 
          endContent = '参数异常';
          break;
        case '10001': 
          endContent = '手机号格式不正确';
          break;
        case '10002': 
          endContent = '模板不存在';
          break;
        case '10003': 
          endContent = '模板变量不正确';
          break;
        case '10004': 
          endContent = '变量中含有敏感词';
          break;
        case '10005': 
          endContent = '变量名称不匹配';
          break;
        case '10006': 
          endContent = '短信长度过长';
          break;
        case '10007': 
          endContent = '手机号查询不到归属地';
          break;
        case '10008': 
          endContent = '产品错误';
          break;
        case '10009': 
          endContent = '价格错误';
          break;
        case '10010': 
          endContent = '重复调用';
          break;
        case '99999': 
          endContent = '系统错误';
          break;
        default:
          endContent = code;
      }
      return endContent;
    },
    getSMSList() {
      this.$port('api/getSMSList').then(res => {
        this.loading = false;
        // 获取到全部数据之后，默认情况下筛选的数据就是全部数据
        res.forEach(element => {
          element.text = this.callbackCode(element.callback_code);
        });
        this.dataList.all = res;
        this.dataList.show = this.dataList.all;
        // 计算数据总量
        this.page.total = this.dataList.show.length;
        // 初始重置翻页函数
        this.pageFun(0, this.page.nowPageNumber);
      });
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
