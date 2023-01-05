<template>
  <div>
    <div class="card-header">
      <span>{{ title }}</span>
      <i class="el-icon-info" />
    </div>
    <div class="card-content">{{ count }}</div>
    <div class="card-chart">
      <slot name="charts" />
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    title: {
      type: String,
      required: true
    },
    count: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  span {
    color: #bbb;
    font-size: 20px;
  }
  i {
    font-size: 20px;
    color: #bbb;
  }
}
.card-content {
  font-size: 30px;
  padding: 10px;
}
.card-chart {
  padding: 0 0 15px 0;
}
.card-footer {
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-size: 18px;
}
</style>
