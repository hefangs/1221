<template>
  <div>
    <el-card>
      <CategorySelect :show="!show" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div>
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table style="width: 100%;margin:20px 0;" border>
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column prop="prop" label="spu名称" width="width" />
          <el-table-column prop="prop" label="spu描述" width="width" />
          <el-table-column prop="prop" label="操作" width="width">
            <template v-slot="{row}">
              <el-button type="success" icon="el-icon-plus" />
              <el-button type="warning" icon="el-icon-edit" />
              <el-button type="info" icon="el-icon-info" />
              <el-button type="danger" icon="el-icon-delete" />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          style="text-align:center;"
          :current-page="page"
          :page-sizes="[10, 20, 30]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->,total, sizes"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div>2</div>
      <div>3</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Spu',
  data() {
    return {
      show: true,
      category1Id: '',
      category2Id: '',
      category3Id: '',
      page: 1,
      limit: 10,
      total: 0
    }
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        this.getSpuList()
      }
    },
    getSpuList() {},
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    handleCurrentChange(pager) {
      this.page = pager
      this.getSpuList(this.page)
    }
  }
}
</script>

<style scoped>
</style>
