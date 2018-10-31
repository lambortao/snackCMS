<template>
  <div class="hp-select">
    <el-select v-model="value" :placeholder="placeholderContent">
      <el-option
        v-for="item in selectContent"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    value: '',
    placeholderContent: {
      type: String,
      default: ''
    },
    selectContent: {
      type: Array,
      default: () => {
        reutrn [{}];
      }
    }
  },
  data() {
    return {}
  },
  created () {
    console.log(this.value);
  }
}
</script>
<style lang="scss" scoped>

</style>
