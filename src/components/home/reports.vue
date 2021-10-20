<template>
<<<<<<< HEAD
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <div id="main" style="width:80%;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Http from "./../../request/index.js";
import _ from "lodash";
export default {
  props: {},
  data() {
    return {
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  methods: {},
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    Http({
      url: "/reports/type/1",
      method: "get",
    }).then((res) => {
      console.log(res);
      if (res.meta.status == 200) {
        //  this.reportdate = res.data;
        const result=_.merge(res.data, this.options);
        myChart.setOption(result);
      }
      if (res.meta.status != 200) {
        // alert(res.meta.msg)
        this.$message.error(res.meta.msg);
      }
    });

    // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(this.reportdate);
  },
  components: {},
=======
    <div>

    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
    methods: {

    },
    components: {

    },
>>>>>>> fbd7a4b09f0ba97ec4eca68c5e96b2b76ce15ec2
};
</script>

<style scoped lang="scss">

</style>
