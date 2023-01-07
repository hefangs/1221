<template>
  <div>
    <el-card>
      <div slot="header" class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio1" size="small">
          <el-radio-button label="上海" />
          <el-radio-button label="北京" />
          <el-radio-button label="广州" />
          <el-radio-button label="深圳" />
        </el-radio-group>
      </div>
      <div>
        <Pie />
      </div>
    </el-card>
  </div>
</template>

<script>
import Pie from './Pie'
export default {
  name: 'Category',
  components: {
    Pie
  },
  data() {
    return {
      radio1: '上海'
    }
  }
}
</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
}
</style>
