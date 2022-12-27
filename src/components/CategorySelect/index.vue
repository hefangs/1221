<template>
  <div>
    <el-form :model="cForm" :inline="true" class="demo-form-inline" :disabled="!show">
      <el-form-item label="一级目录">
        <el-select v-model="cForm.category1Id" placeholder="请选择" @change="handle1">
          <el-option v-for="c1 in list1" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级目录">
        <el-select v-model="cForm.category2Id" placeholder="请选择" @change="handle2">
          <el-option v-for="c2 in list2" :key="c2.id" :label="c2.name" :value="c2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级目录">
        <el-select v-model="cForm.category3Id" placeholder="请选择" @change="handle3">
          <el-option v-for="c3 in list3" :key="c3.id" :label="c3.name" :value="c3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  // 父组件给子组件传递props:三级联动和isShowTable 取反
  // eslint-disable-next-line vue/require-prop-types
  props: ['show'],
  data() {
    return {
      list1: [], // 一级分类数据
      list2: [], // 二级分类数据
      list3: [], // 三级分类数据
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    this.getCategory1List()
  },
  methods: {
    // 获取一级分类数据
    async getCategory1List() {
      const result = await this.$API.attr.reqCategory1List()
      if (result.code === 200) {
        this.list1 = result.data
      }
    },
    // 一级目录Select发生改变触发的回调
    async handle1() {
      // 清除二级、三级目录数据
      this.list2 = []
      this.list3 = []
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      // 解构category1Id 或者传参直接写：this.cForm.category1Id
      const { category1Id } = this.cForm
      // 向父组件传递数据
      this.$emit('getCategoryId', { categoryId: category1Id, level: 1 })
      const result = await this.$API.attr.reqCategory2List(category1Id)
      if (result.code === 200) {
        this.list2 = result.data
      }
    },
    // 二级目录Select发生改变触发的回调
    async handle2() {
      // 清除三级目录数据
      this.list3 = []
      this.cForm.category3Id = ''
      const { category2Id } = this.cForm
      // 向父组件传递数据
      this.$emit('getCategoryId', { categoryId: category2Id, level: 2 })
      const result = await this.$API.attr.reqCategory3List(category2Id)
      if (result.code === 200) {
        this.list3 = result.data
      }
    },
    // 三级目录Select发生改变触发的回调
    handle3() {
      const { category3Id } = this.cForm
      // 向父组件传递数据
      this.$emit('getCategoryId', { categoryId: category3Id, level: 3 })
    }
  }
}
</script>

<style >
</style>
