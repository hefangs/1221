<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="spu名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="sku名称">
        <el-input v-model="skuInfo.skuName" placeholder="sku名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" placeholder="价格(元)" />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="重量(千克)" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuInfo.skuDesc" type="textarea" placeholder="规格描述" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item v-for="attr in attrList" :key="attr.id" :label="attr.attrName">
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item
            v-for="saleAttr in saleAttrList"
            :key="saleAttr.id"
            :label="saleAttr.saleAttrName"
          >
            <el-select v-model="saleAttr.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="imgList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" prop="prop" label="label" width="80" align="center" />
          <el-table-column prop="prop" label="图片" width="width" align="center">
            <template v-slot="{row}">
              <img :src="row.imgUrl" alt style="width:100px;height:100px;" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width" align="center" />
          <el-table-column prop="prop" label="操作" width="width" align="center">
            <template v-slot="{row}">
              <el-button v-if="row.isDefault == 0" type="primary" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSku">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      imgList: [],
      attrList: [],
      saleAttrList: [],
      spu: {},
      skuInfo: {
        spuId: 0,
        tmId: 0,
        category3Id: 0,
        price: '',
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0
          // }
        ],
        skuDefaultImg: '',
        skuDesc: '',
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   isDefault: 'string',
          //   skuId: 0,
          //   spuImgId: 0
          // }
        ],
        skuName: '',
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: 'string',
          //   saleAttrValueId: 0,
          //   saleAttrValueName: 'string',
          //   skuId: 0,
          //   spuId: 0
          // }
        ],
        weight: ''
      },
      list: []
    }
  },
  methods: {
    cancel() {
      this.$emit('ChangeScene', { scene: 0, flag: '' })
      Object.assign(this._data, this.$options.data())
    },
    // 父组件点击添加初始化数据，有3个请求
    async initSkuAddData(category1Id, category2Id, spu) {
      // console.log(spu)
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
      const result1 = await this.$API.spu.reqImageList(spu.id)
      const result2 = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      const result3 = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        spu.category3Id
      )
      if (result1.code === 200) {
        const arrList = result1.data
        arrList.forEach((item) => {
          item.isDefault = 0
        })
        this.imgList = arrList
      }
      if (result2.code === 200) {
        this.saleAttrList = result2.data
      }
      if (result3.code === 200) {
        this.attrList = result3.data
      }
    },
    handleSelectionChange(val) {
      this.list = val
    },
    changeDefault(row) {
      this.imgList.forEach((item) => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    async saveSku() {
      // const arr = []
      // this.attrList.forEach((item) => {
      //   if (item.attrIdAndValueId) {
      //     const [attrId, valueId] = item.attrIdAndValueId.split(':')
      //     const newObj = { attrId, valueId }
      //     arr.push(newObj)
      //   }
      //   this.skuInfo.skuAttrValueList = arr
      // })

      const { attrList, saleAttrList, list, skuInfo } = this
      skuInfo.skuAttrValueList = attrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])
      skuInfo.skuSaleAttrValueList = saleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      skuInfo.skuImageList = list.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      const result = await this.$API.spu.reqAddSku(skuInfo)
      // console.log(result)
      if (result.code === 200) {
        this.$emit('ChangeScene', { scene: 0, flag: '' })
        this.$notify.success('保存成功')
        Object.assign(this._data, this.$options.data())
      }
    }
  }
}
</script>

<style scoped>
</style>
