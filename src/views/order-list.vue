<template>
  <div id="orderList">
    <header class="select-box">
      <div class="select">
        <Select v-model="model1" style="width:200px" placeholder="用户筛选">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model1" style="width:200px" placeholder="商品筛选">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="find">
        <Input v-model="value" placeholder="输入用户名或商品名进行查找" style="width: 200px;" />
      </div>      
    </header>
    <section>
      <Table width="100%" border :columns="columns1" :data="data1"></Table>
    </section>
    <div class="pages">
      <Page :total="100" show-total show-sizer show-elevator />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cityList: [
          {
              value: 'New York',
              label: 'New York'
          },
          {
              value: 'London',
              label: 'London'
          },
          {
              value: 'Sydney',
              label: 'Sydney'
          },
          {
              value: 'Ottawa',
              label: 'Ottawa'
          },
          {
              value: 'Paris',
              label: 'Paris'
          },
          {
              value: 'Canberra',
              label: 'Canberra'
          }
      ],
      model1: '',
      columns1: [
          {
              title: 'Name',
              key: 'name'
          },
          {
              title: 'Age',
              key: 'age'
          },
          {
              title: 'Address',
              key: 'address'
          }
      ],
      data1: [
          {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
          },
          {
              name: 'Jim Green',
              age: 24,
              address: 'London No. 1 Lake Park',
              date: '2016-10-01'
          },
          {
              name: 'Joe Black',
              age: 30,
              address: 'Sydney No. 1 Lake Park',
              date: '2016-10-02'
          },
          {
              name: 'Jon Snow',
              age: 26,
              address: 'Ottawa No. 2 Lake Park',
              date: '2016-10-04'
          }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/methods.scss';

header{
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding-bottom: 20px;
}
section{
  padding: 20px 0;
  border-top: 1px solid $hr;
  border-bottom: 1px solid $hr;
}
.pages{
  padding-top: 20px;
  width: 100%;
}
</style>
