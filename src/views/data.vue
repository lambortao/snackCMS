<template>
  <div id="data">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card shadow="hover">
          <div slot="header">
            <h3>今日日商</h3>
          </div>
          <div class="data">
            <p style="font-weight: bold; color: #c23531;">￥{{dayMoney.toFixed(2)}}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover">
          <div slot="header">
            <h3>今日客流</h3>
          </div>
          <div class="data">
            <p style="font-weight: bold; color: #2f4554;">{{passengerFlow}}人</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <div class="turnover" style="padding: 10px;margin-top: 30px;">
        <div class="ve-button">
          <el-radio v-model="showDay" label="1" border @change="changeDay(7)">查看七天</el-radio>
          <el-radio v-model="showDay" label="2" border @change="changeDay(30)">查看一月</el-radio>
        </div>
        <ve-line 
          :data="chartData" 
          :colors="colors"
          :toolbox="toolbox"></ve-line>
      </div>
      <div class="sales-volume" style="padding: 10px;">
        <h2>单品销量</h2>
        <ve-histogram 
          :data="singleProductSales" 
          :colors="colors"
          :settings="chartSettings"
          :extend="chartExtend"></ve-histogram>
      </div>
    </el-row>
  </div>
</template>
<script>
import VeLine from 'v-charts/lib/line.common';
import VeBar from 'v-charts/lib/bar.common';
import VeHistogram from 'v-charts/lib/histogram.common';
import 'echarts/lib/component/toolbox';

export default {
  components: {
    VeLine,
    VeBar,
    VeHistogram
  },
  data () {
    return {
      allData: '',
      showDay: '1',
      dayMoney: 10,
      passengerFlow: 10,
      allUser: 30,
      chartSettings: {
        axisSite: { left: ['销量'] }
      },
      chartExtend: {
        xAxis: {
          axisLabel: {
            rotate: 45
          }
        }
      },
      colors: ['#c23531','#2f4554'],
      toolbox: {
        feature: {
          magicType: {type: ['line', 'bar']},
          saveAsImage: {}
        }
      },
      chartData: {
        columns: ['时间', '日商', '客流量'],
        rows: []
      },
      singleProductSales: {
        columns: ['商品', '销量'],
        rows: []
      }
    }
  },
  created() {
    this.getTurnoverList();
    this.getProductList();
  },
  methods: {
    // 获取数据列表
    getTurnoverList() {
      this.$port('turnover/getTurnoverList').then(res => {
        let todayData = res[res.length - 1];
        this.dayMoney = parseFloat(todayData['turnover']);
        this.passengerFlow = todayData['passenger_flow'];
        this.allData = res;
        this.runCharts(7, res);
      });
    },
    // 在图表上显示数据
    runCharts(day, data) {
      let newData = [];
      if (data.length < day) {
        let difference = day - data.length;
        for (let index = 0; index < difference; index++) {
          data.unshift({
            time: `倒数第${index + 1}天`,
            turnover: 0,
            passenger_flow: 0
          })
        }
      } else if (data.length > day) {
        data = data.slice(-day);
      }
      data.forEach(element => {
        newData.push({
          '时间': element.time,
          '日商': element.turnover,
          '客流量': element.passenger_flow
        })
      });
      this.chartData.rows = newData;
    },
    // 切换日商时间
    changeDay(day) {
      this.runCharts(day, this.allData);
    },
    getProductList () {
      this.$port('product/getProductList').then((res) => {
        if (res) {
          res.forEach(element => {
            this.singleProductSales.rows.push({
              '商品': element.name,
              '销量': parseInt(element.sales_volume)
            });
          });
          console.log(this.singleProductSales.rows);
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
}
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

