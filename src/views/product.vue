<template>
  <div id="product">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名" prop="name">
        <el-input v-model="ruleForm.name" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="商品简介" prop="intro">
        <el-input v-model="ruleForm.intro" style="width: 300px;" placeholder="控制在十五个字内"></el-input>
      </el-form-item>
      <el-form-item label="商品详情" prop="content">
        <el-input type="textarea" v-model="ruleForm.content" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input-number v-model="ruleForm.price" :precision="1" :min="0.5" :step="0.1" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="商品库存" prop="stock">
        <el-input-number v-model="ruleForm.stock" :step="1" :min="0" :max="999"></el-input-number>
      </el-form-item>
      <el-form-item label="是否上架" prop="sell">
        <el-switch
          v-model="ruleForm.sell"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否置顶" prop="hot">
        <el-switch
          v-model="ruleForm.hot"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="postLoading">提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import imageUpload from '@/lib/image-upload.vue';
import axios from 'axios';

export default {
  data() {
    return {
      kvData: {
        size: [300, 300],
        type: 'alone',
        url: ''
      },
      postLoading: false,
      ruleForm: {
        name: '',
        intro: '',
        content: '',
        price: 1,
        stock: 1,
        sell: true,
        hot: false
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入商品简介', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入商品详情', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    imageUpload
  },
  created () {
    this.getProduct();
  },
  methods: {
    // 获取产品详情
    getProduct() {
      let nowPageId = this.$route.params.id;
      if (nowPageId != 'add') {
        this.$port('product/detail', {
          'id': nowPageId
        }).then(res => {
          this.ruleForm = res;
        });
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let apiUrl = 'product/updataProduct';
          let doneMsg = '信息修改成功';
          let nowPageId = this.$route.params.id;
          if (nowPageId == 'add') {
            apiUrl = 'product/addProduct';
            doneMsg = '商品添加成功！'
          }
          this.postLoading = true;
          this.$port(apiUrl, this.ruleForm).then((res) => {
            if (res.status == 1) {
              this.$message({
                message: doneMsg,
                type: 'success'
              });
              this.postLoading = false;
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 图片上传完成后
    handleAvatarSuccess(res, file) {
      console.log(file);
    },
    // 验证图片格式
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      console.log('x');
      return isLt2M;
    }
  }
}
</script>

<style lang="scss" scoped>
.el-upload {
  border: 1px dashed #999;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
