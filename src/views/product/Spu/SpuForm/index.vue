<!-- eslint-disable vue/html-self-closing -->
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
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndName" :placeholder="`还有${unSelect.length}个未选择`">
          <el-option
            v-for="item in unSelect"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          />
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndName"
          @click="addSaleAttr"
        >添加销售属性</el-button>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column prop="saleAttrName" label="属性名" width="100" align="center" />
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template v-slot="{row,$index}">
              <el-tag
                v-for="item in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                :disable-transitions="false"
                @close="handleClose(row,$index)"
              >{{ item.saleAttrValueName }}</el-tag>
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="$event.target.blur"
                @blur="handleInputConfirm(row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="100" align="center">
            <template v-slot="{row,$index}">
              <el-popconfirm
                :title="`你确定要删除:${row.saleAttrName}?`"
                @onConfirm="deleteSaleAttrList($index)"
              >
                <el-button slot="reference" type="danger" icon="el-icon-delete" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
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
      attrIdAndName: '',
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
  computed: {
    unSelect() {
      const result = this.baseSaleAttrList.filter((item1) => {
        return this.spu.spuSaleAttrList.every((item2) => {
          return item1.name !== item2.saleAttrName
        })
      })
      return result
    }
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      this.spuImageList = fileList
    },
    handleSuccess(response, file, fileList) {
      this.spuImageList = fileList
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
    },
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(':')
      const newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrIdAndName = ''
    },
    showInput(row) {
      // console.log(row)
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row
      if (inputValue.trim() === '') {
        this.$notify.error('属性值不能为空')
        return
      }
      const result = row.spuSaleAttrValueList.some(
        (item) => item.saleAttrValueName === inputValue // 属性值不能重复,
      )
      // console.log(result)
      if (result) {
        this.$notify.error('属性值不能重复')
        return
      }
      const newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
    },
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1)
    },
    deleteSaleAttrList(index) {
      this.spu.spuSaleAttrList.splice(index, 1)
    },
    async addOrUpdateSpu() {
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.imgUrl
        }
      })
      const result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      // console.log(result)
      if (result.code === 200) {
        if (!this.spu.id) {
          this.$notify.success('添加成功')
          this.$emit('ChangeScene', { scene: 0, flag: '添加' })
        } else {
          this.$notify.success('修改成功')
          this.$emit('ChangeScene', { scene: 0, flag: '添加' })
        }
      }
      Object.assign(this._data, this.$options.data())
    }
  }
}
</script>

<style scoped>
</style>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
