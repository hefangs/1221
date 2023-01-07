<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>&nbsp;
      <i class="el-icon-info icon" />
    </div>
    <div class="main">
      <span>12306</span>
      <span class="span1">17.1</span>
      <i class="el-icon-caret-top icon" />
    </div>
    <div>
      <div ref="footer" class="footer" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineCharts',
  data() {
    return {}
  },
  mounted() {
    const lineC = echarts.init(this.$refs.footer)
    lineC.setOption({
      xAxis: {
        show: false,
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [
        {
          data: [820, 932, 901, 934, 1490, 1530, 5320],
          type: 'line',
          smooth: true,
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: 'purple'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'purple' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'white' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    })
  }
}
</script>

<style scoped>
.el-icon-info {
  font-size: 18px;
}
.el-icon-caret-top {
  color: red;
  font-size: 20px;
}
.span1 {
  margin: 20px;
}
.footer {
  width: 100%;
  height: 150px;
}
</style>
