<template>
  <div>
    <el-card>
      <CategorySelect :show="!show" @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table :data="spuList" style="width: 100%;margin:20px 0;" border>
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column prop="spuName" label="spu名称" width="width" />
          <el-table-column prop="description" label="spu描述" width="width" />
          <el-table-column prop="prop" label="操作" width="width">
            <template v-slot="{row}">
              <el-tooltip class="item" effect="light" content="添加sku" placement="bottom">
                <el-button type="success" icon="el-icon-plus" />
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="修改spu" placement="bottom">
                <el-button type="warning" icon="el-icon-edit" @click="editSpu(row)" />
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="查看当前spu全部sku列表" placement="bottom">
                <el-button type="info" icon="el-icon-info" />
              </el-tooltip>
              <el-tooltip class="item" effect="light" content="删除spu" placement="bottom">
                <el-button type="danger" icon="el-icon-delete" />
              </el-tooltip>
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
      <SpuForm v-show="scene == 1" ref="spuForm" @ChangeScene="ChangeScene" />
      <SkuForm v-show="scene == 2" />
    </el-card>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: 'Spu',
  components: {
    SpuForm,
    SkuForm
  },
  data() {
    return {
      show: true,
      category1Id: '',
      category2Id: '',
      category3Id: '',
      page: 1,
      limit: 10,
      total: 0,
      spuList: [],
      scene: 0 // 0:代表展示spu列表数据，1：添加spu|修改spu，2：添加sku
    }
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level == 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        this.getSpuList()
      }
    },
    async getSpuList(pager = 1) {
      this.page = pager
      const { page, limit, category3Id } = this
      const result = await this.$API.spu.reqSpuList(page, limit, category3Id)
      // console.log(result)
      this.spuList = result.data.records
      this.total = result.data.total
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    handleCurrentChange(pager) {
      this.page = pager
      this.getSpuList(this.page)
    },
    addSpu() {
      this.scene = 1
    },
    editSpu(row) {
      this.scene = 1
      // 父组件通过$refs获取子组件的方法
      this.$refs.spuForm.initSpuData(row)
    },
    ChangeScene(scene) {
      this.scene = scene
    }
  }
}
</script>

<style scoped>
</style>
