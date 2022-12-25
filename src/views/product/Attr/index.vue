<template>
  <div>
    <el-card style="margin:20px 0 ;">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-if="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom:20px;"
          :disabled="!category3Id"
          @click="isShowTable=false"
        >添加属性</el-button>
        <el-table :data="attrList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="180" />
          <el-table-column prop="attrName" label="属性名称" width="180" />
          <el-table-column prop="date" label="属性值列表" width="width">
            <template v-slot="{row}">
              <el-tag
                v-for="al in row.attrValueList"
                :key="al.id"
                type="success"
                style="margin: 5px"
              >{{ al.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="操作" width="180">
            <template v-slot="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="isShowTable=false" />
              <el-button type="danger" icon="el-icon-delete" size="mini" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-form :inline="true" class="demo-form-inline" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" label-width="80px" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
        <el-button type="primary" @click="isShowTable=true">取消</el-button>
        <el-table border style="margin:20px 0;">
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column prop="date" label="属性值名称" width="width" />
          <el-table-column prop="date" label="操作" width="300" al ign="center" />
        </el-table>
        <el-button type="primary">确定</el-button>
        <el-button type="primary" @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      isShowTable: true,
      attrInfo: {
        attrName: '',
        attrValueList: [
          {
            attrId: 0,
            valueName: ''
          }
        ],
        categoryId: 0,
        categoryLevel: 3,
        id: 0
      }
    }
  },
  methods: {
    // 自定义事件-接受子组件传递的123级categoryId(categoryId, level)
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
        this.getAttrList()
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this
      const result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      )
      if (result.code === 200) {
        this.attrList = result.data
      }
    }
  }
}
</script>
<style >
</style>
