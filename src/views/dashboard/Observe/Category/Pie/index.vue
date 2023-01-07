<template>
  <div>
    <div ref="pie" class="pie" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Pie',
  mounted() {
    const pieChart = echarts.init(this.$refs.pie)
    pieChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
  }
}
</script>

<style scoped>
.pie {
  width: 100%;
  height: 348px;
}
</style>
