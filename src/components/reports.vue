<template>
  <el-card class="box">
    <cus-bread level1="数据统计" level2="数据报表" class="bread"></cus-bread>
    <div id="main" style="width: 600px;height:400px;"></div>
  </el-card>
</template>
<script>
import echarts from "echarts";
export default {
  mounted() {
    this.getReports();
  },
  methods: {
    async getReports() {
      var myChart = echarts.init(document.getElementById("main"));
      const res = await this.$http.get(`reports/type/1`);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      console.log(data);
      // 指定图表的配置项和数据
      var option = (option = {
        title: {
          text: "数据报表"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: data.legend
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: data.xAxis,
        yAxis: data.yAxis,
        series: data.series
      });

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style scoped>
.box {
  height: 100%;
}
.bread {
  margin-bottom: 20px;
}
</style>