<template>
  <div>
    <el-card style="margin:20px 0 ;">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px;">添加属性</el-button>
      <el-table :data="attrList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="180"></el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="180"></el-table-column>
        <el-table-column prop="date" label="属性值列表" width="width">
          <template v-slot="{row}">
            <el-tag type="success" v-for="al in row.attrValueList" :key="al.id" style="margin: 5px">{{al.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" width="180">
          <template v-slot="{row}">
            <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card >
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
      attrList: []
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
      const result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
      if (result.code === 200) {
        this.attrList = result.data
      }
    }
  }
}
</script>
<style >
</style>
