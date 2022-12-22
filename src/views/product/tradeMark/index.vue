<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px">添加</el-button>
    <el-table :data="data" style="margin:10px 0px" border>
      <el-table-column prop="prop" label="序号" width="80px" align="center" />
      <el-table-column prop="prop" label="品牌名称" width="width" />
      <el-table-column prop="prop" label="品牌logo" width="width" />
      <el-table-column prop="prop" label="操作" width="width" />
    </el-table>
    <el-pagination
      style="margin-top:20px;text-align:center;"
      background
      :current-page="8"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="99"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      data: []
    }
  }
}
</script>

<style scoped>
</style>
