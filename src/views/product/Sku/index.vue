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
          <el-button
            v-if="row.isSale == 0"
            type="success"
            size="mini"
            icon="el-icon-bottom"
            @click="onSale(row)"
          ></el-button>
          <el-button v-else type="success" size="mini" icon="el-icon-top" @click="cancelSale(row)"></el-button>
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="updateSku(row)"></el-button>
          <el-button type="info" size="mini" icon="el-icon-info" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteSku(row)"></el-button>
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
    <el-drawer title="详情" :show-close="false" :visible.sync="drawer" size="40%">
      <el-form ref="form" label-width="120px" :data="skuInfo">
        <el-form-item label="名称:" style>{{ skuInfo.skuName }}</el-form-item>
        <el-form-item label="描述:">{{ skuInfo.skuDesc }}</el-form-item>
        <el-form-item label="价格:">{{ skuInfo.price }} 元</el-form-item>
        <el-form-item label="平台属性:">
          <el-tag
            v-for="item in skuInfo.skuAttrValueList"
            :key="item.id"
            style="margin:0 5px;"
            type="success"
          >{{ item.attrName }}-{{ item.valueName }}</el-tag>
        </el-form-item>
        <el-form-item label="商品图片:">
          <el-carousel style="border:1px #ccc solid;">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt />
            </el-carousel-item>
          </el-carousel>
        </el-form-item>
      </el-form>
    </el-drawer>
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
      skuList: [],
      skuInfo: {},
      drawer: false
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
      // console.log(result)
      if (result.code === 200) {
        this.skuList = result.data.records
        this.total = result.data.total
      }
    },
    async onSale(row) {
      // console.log(row)
      const result = await this.$API.sku.reqOnSale(row.id)
      if (result.code === 200) {
        // eslint-disable-next-line
        row.isSale = 1
        this.$notify.success('上架成功')
      }
    },
    async cancelSale(row) {
      const result = await this.$API.sku.reqCancelSale(row.id)
      if (result.code === 200) {
        // eslint-disable-next-line
        row.isSale = 0
        this.$notify.success('下架成功')
      }
    },
    updateSku(row) {
      this.$notify.info('正在开发中！')
    },
    async getSkuInfo(row) {
      this.drawer = true
      const result = await this.$API.sku.reqSkuInfo(row.id)
      // console.log(result)
      if (result.code === 200) {
        this.skuInfo = result.data
      }
    },
    async deleteSku(row) {
      // console.log(row)
      const result = await this.$API.sku.reqDeleteSku(row.id)
      // console.log(result)
      if (result.code === 200) {
        this.$notify.success('删除成功')
        this.getSkuList()
      }
    }
  }
}
</script>

<style scoped>
</style>

