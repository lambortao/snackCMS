<template>
  <div id="imageUpload">
    <div class="image-list">
      <div class="image-alone">

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
