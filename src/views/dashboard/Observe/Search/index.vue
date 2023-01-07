<template>
  <el-card>
    <div slot="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineCharts />
        </el-col>
        <el-col :span="12">
          <LineCharts />
        </el-col>
      </el-row>
    </div>
    <el-table style="margin:10px 0;" border>
      <el-table-column prop="prop" label="排名" width="width" />
      <el-table-column prop="prop" label="搜索用户数" width="width" />
      <el-table-column prop="prop" label="用户数" width="width" sortable />
      <el-table-column prop="prop" label="周涨幅" width="width" sortable />
    </el-table>
    <el-pagination
      background
      style="text-align:center"
      :current-page="page"
      :page-sizes="[10, 20, 30]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import LineCharts from './LineCharts'

export default {
  name: 'Search',
  components: {
    LineCharts
  },
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0
    }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
</style>
