<template>
  <div class="home">
<div style="display: flex; width: 98%; margin: 10px;">
  <van-popup
   v-model="show"
   position="bottom"
   >
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"

/>
  </van-popup>
<div class="data-filter">
    <label for="startTime" style=""> 从 </label>
    <input id="startTime" type="text" class="filter-input" placeholder="开始时间" @click="startTime">
    
    <label for="endTime" > 到 </label>
    <input id="endTime" type="text" class="filter-input"  placeholder="结束时间" @click="endTime"> 
    
</div>
    <van-button plain hairline type="primary" size="small" style="margin:0 20px">导出excel</van-button>
</div>
    <van-tabs v-model="active" color="#4fc08d" >
      <van-tab title="营业收入统计">
        <div class="vant-table">
          <table cellspacing="0"  style="width: 100%" class="table">
            <tr>
              <th class="th" v-for="(item, index) in option.column" :key="index">
                {{ item.label }}
              </th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index" class="list-tr">
              <td v-for="(context, i) in option.column" :key="i" class="list-td">
                {{ item[context.prop] }}
              </td>
            </tr>
          </table>
        </div>
      </van-tab>
      <van-tab title="净收入统计">  
        <div class="vant-table">
          <table cellspacing="0" style="width: 100%" class="table">
            <tr>
              <th class="th" v-for="(item, index) in option.column" :key="index">
                {{ item.label }}
              </th>
            </tr>
            <tr v-for="(item, index) in tableData2" :key="index" class="list-tr">
              <td v-for="(context, i) in option.column" :key="i" class="list-td">
                {{ item[context.prop] }}
              </td>
            </tr>
          </table>
        </div></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      show: false,
      active: 0,
      tableData: [
        ["九江","353",],
        ["南昌","4563",],
        ["上饶","356",],
        ["赣州","3563",],
        ["萍乡","356",],
      ],
      tableData2: [
        ["九江","353",],
        ["南昌","4563",],
        ["上饶","356",],
        ["赣州","3563",],
        ["萍乡","356",],
        ["524","245",],
        ["2443254","535",],
      ],
      option:{
        column: [
          {
            label: "部门",
            prop: 0,
          },
          {
            label: "全年债务",
            prop: 1,
          },
          {
            label: "当日收入",
            prop: 1,
          },
          {
            label: "当日支出",
            prop: 1,
          }
        ],
      },
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
    };
  },
  mounted() {
  },
  methods: {
    startTime() {
      this.show= true
    },
    endTime() {
      this.show= true
    }
  }
};
</script>

<style lang="scss" scoped>
.vant-table {
  .table {
    border-radius: 0.185185rem;
    padding: 5px;
    .th {
      height: 1.074074rem;
      line-height: 1.074074rem;
      text-align: center;
      border-top-left-radius: 0.185185rem;
      border-top-right-radius: 0.185185rem;
    }
    .list-tr {
      height: 1.074074rem;
      line-height: 1.074074rem;
    }
    // .list-tr:nth-child(2n) {
    //   background-color: #33333b;
    // }
    .list-td {
      border: 1px solid #CCCCCC;
    }
  }
}
.data-filter {
  display:flex;
  width: 70%;
  label {
    line-height: 32px;
    margin: 0 5px;
  }
}
.filter-input {

  display: flex;
  width: 100px;
  height: 28px;
  background: #EEEEEE;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
}
</style>
