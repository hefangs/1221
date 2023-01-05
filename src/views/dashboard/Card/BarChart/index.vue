<template>
  <div ref="charts" class="charts" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'BarChart',
  mounted() {
    const barCharts = echarts.init(this.$refs.charts)
    barCharts.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      xAxis: {
        show: false,
        type: 'category'
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '50%',
          data: [1150, 2330, 5224, 2818, 7315, 3497, 5760, 9918, 1600]
        }
      ]
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
