<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <el-table style="width: 100%;margin:10px 0;" border :data="skuList">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="skuName" label="名称" width="width" align="center" />
      <el-table-column prop="skuDesc" label="描述" width="width" align="center" />
      <el-table-column prop="prop" label="默认图片" width="150" align="center">
        <template v-slot="{row}">
          <img :src="row.skuDefaultImg" alt style="width:100px;height:100px;" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(千克)" width="100" align="center" />
      <el-table-column prop="price" label="价格(元)" width="80" align="center" />
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template v-slot="{row}">
          <el-button type="success" size="mini" icon="el-icon-top"></el-button>
          <el-button type="success" size="mini" icon="el-icon-bottom"></el-button>
          <el-button type="warning" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="info" size="mini" icon="el-icon-info"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="text-align:center"
      :current-page="page"
      :page-sizes="[10, 20, 30]"
      :page-size="10"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      skuList: []
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    handleSizeChange(limit) {
      this.limit = limit
      this.getSkuList()
    },
    handleCurrentChange(pager) {
      this.page = pager
      this.getSkuList(this.page)
    },
    async getSkuList(pager = 1) {
      this.page = pager
      const { page, limit } = this
      const result = await this.$API.sku.reqSkuList(page, limit)
      console.log(result)
      if (result.code === 200) {
        this.skuList = result.data.records
        this.total = result.data.total
      }
    }
  }
}
</script>

<style scoped>
</style>
