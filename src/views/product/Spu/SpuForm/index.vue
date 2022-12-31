<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="spu名称">
        <el-input v-model="spu.spuName" placeholder="请输入spu名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option v-for="tm in trademarkList" :key="tm.id" :label="tm.tmName" :value="tm.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input v-model="spu.description" type="textarea" placeholder="请输入spu描述" />
      </el-form-item>
      <el-form-item label="spu图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select placeholder="还有3个未选择" value>
          <el-option label="label" value="value" />
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column prop="prop" label="属性名" width="width" />
          <el-table-column prop="prop" label="属性值名称列表" width="width" />
          <el-table-column prop="prop" label="操作" width="width" />
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spuImageList: [],
      trademarkList: [],
      baseSaleAttrList: [],
      spu: {
        category3Id: 0,
        description: '',
        tmId: 0,
        spuName: '',
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   spuId: 0
          // }
        ],
        spuSaleAttrList: [
          // {
          //   // baseSaleAttrId: 0,
          //   // id: 0,
          //   // saleAttrName: 'string',
          //   // spuId: 0,
          //   // spuSaleAttrValueList: [
          //   //   {
          //   //     baseSaleAttrId: 0,
          //   //     id: 0,
          //   //     isChecked: 'string',
          //   //     saleAttrName: 'string',
          //   //     saleAttrValueName: 'string',
          //   //     spuId: 0
          //   //   }
          //   // ]
          // }
        ]
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    cancel() {
      this.$emit('ChangeScene', 0)
    },
    // 初始化数据，有4个请求
    async initSpuData(spu) {
      const spuResult = await this.$API.spu.reqSpu(spu.id)
      // console.log(spuResult)
      if (spuResult.code === 200) {
        this.spu = spuResult.data
      }
      const spuImageListResult = await this.$API.spu.reqImageList(spu.id)
      if (spuImageListResult.code === 200) {
        const imgList = spuImageListResult.data
        imgList.forEach((item) => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = imgList
      }
      const trademarkListResult = await this.$API.spu.reqTrademarkList()
      if (trademarkListResult.code === 200) {
        this.trademarkList = trademarkListResult.data
      }
      const baseSaleAttrListResult = await this.$API.spu.reqBaseSaleAttrList()
      if (baseSaleAttrListResult.code === 200) {
        this.baseSaleAttrList = baseSaleAttrListResult.data
      }
    }
  }
}
</script>

<style scoped>
</style>
