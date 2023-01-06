<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName" class="tab" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="销售额">1</el-tab-pane>
        <el-tab-pane label="销售额" name="销售额">2</el-tab-pane>
      </el-tabs>
      <div class="right">
        <span>今日</span>
        <span>本周</span>
        <span>本月</span>
        <span>本年</span>
        <el-date-picker
          v-model="value1"
          size="small"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">1</el-col>
        <el-col :span="6">2</el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Sale',
  data() {
    return {
      activeName: '销售额'
    }
  }
}
</script>

<style scoped lang="scss">
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
  span {
    margin-right: 15px;
  }
}
</style>
