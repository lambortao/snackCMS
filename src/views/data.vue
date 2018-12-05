<template>
  <div id="data">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card shadow="hover">
          <div slot="header">
            <h3>今日日商</h3>
          </div>
          <div class="data">
            <p>￥{{dayMoney.toFixed(2)}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover">
          <div slot="header">
            <h3>今日客流</h3>
          </div>
          <div class="data">
            <p>{{passengerFlow}}人</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dayMoney: 10,
      passengerFlow: 10,
      allUser: 30
    }
  },
  created() {
    this.getTurnoverList();
  },
  methods: {
    getTurnoverList() {
      this.$port('turnover/getTurnoverList').then(res => {
        let todayData = res[res.length - 1];
        this.dayMoney = parseFloat(todayData['turnover']);
        this.passengerFlow = todayData['passenger_flow'];
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.el-card__header{
  margin: 15px 20px;
}
h3{
  font-size: 1.25em;
  font-weight: bold;
  margin: 0;
}
.data{
  p{
    margin: 0;
    font-size: 1.5em;
    font-weight: 100;
  }
}
</style>

