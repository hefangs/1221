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
      title: {
        text: 'Search Eng',
        subtext: 1048,
        left: 'center',
        top: 'center'
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
              show: false,
              fontSize: 40,
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
    pieChart.on('mouseover', (params) => {
      const { name, value } = params.data
      pieChart.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
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
