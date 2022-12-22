<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px">添加</el-button>
    <el-table :data="list" style="margin:10px 0px" border>
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column prop="tmName" label="品牌名称" width="200px" align="center" />
      <el-table-column prop="logoUrl" label="品牌Logo" width="width" align="center">
        <template slot-scope="{ row }">
          <!-- {{ row }}-{{ $index }} -->
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img :src="row.logoUrl" alt style="width: 150px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="limit"
      layout="total, prev, pager, next,jumper, -> ,sizes"
      :total="total"
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
      page: 1,
      limit: 10,
      total: 0,
      list: []
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    // 获取品牌列表数据
    async getPageList() {
      const { page, limit } = this
      const result = await this.$API.trademark.reqTradeMarkList(page, limit)
      // console.log(result)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    // 每页条数
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    // 跳转到X页
    handleCurrentChange(page) {
      this.page = page
      this.getPageList()
    }
  }
}
</script>

<style scoped>
</style>
