<template>
  <div id="purchase">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名" prop="id">
        <el-select v-model="ruleForm.id" placeholder="选择商品">
          <el-option
            v-for="item in productName"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="进货渠道" prop="source">
        <el-input v-model="ruleForm.source" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="进货数量" prop="num">
        <el-input-number v-model="ruleForm.num" :step="1" :min="1" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="采购单价" prop="buy_price">
        <el-input-number v-model="ruleForm.buy_price" :precision="1" :min="0" :step="0.1" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="预售单价" prop="sell_price">
        <el-input-number v-model="ruleForm.sell_price" :precision="1" :min="0" :step="0.1" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="postLoading">提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      postLoading: false,
      ruleForm: {
        id: '',
        source: '京东',
        num: 1,
        buy_price: 0,
        sell_price: 0
      },
      productName: []
    };
  },
  created() {
    this.getProductName();
  },
  methods: {
    getProductName() {
      this.$port('product/getProductList').then((res) => {
        res.forEach(element => {
          let nowProduct = {
            'name': element.name,
            'id': element.id
          }
          this.productName.push(nowProduct);
        });
      })
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postLoading = true;
          this.$port('purchase/addPurchase', this.ruleForm).then(res => {
            if (res.status == 1) {
              this.$message({
                message: '订货单新增成功',
                type: 'success'
              });
              this.$refs[formName].resetFields();
              this.postLoading = false;
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
