<template>
  <div id="imageUpload">
    <!-- 图片列表 -->
    <div class="image-list">
      <!-- 单独的图片容器，每个图片有个独立的，单图只有一个，多图会自动添加 -->
      <div class="image-alone">
        <div class="control"></div>
        <input type="file">
        <img src="" alt="">
        <div class="bottom"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    // 图片的宽高
    imageSize: {
      type: Array,
      default: [300, 300]
    },
    // 图片的属性，是单图还是多图
    imageType: {
      type: String,
      default: 'alone'
    },
    // 图片上传的路径
    imageUrl: {
      type: String
    }
  },
  created () {
    console.log(this.imageSize);
  }
}
</script>

<style lang="scss" scoped>

</style>
