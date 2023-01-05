<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="126560">
            <template slot="charts">
              <span>周同比&nbsp;</span>
              <i class="el-icon-top" />
              <span>日同比&nbsp;</span>
              <i class="el-icon-bottom" />
            </template>
            <template slot="footer">
              <span>日销售&nbsp;5008</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="12306">
            <template slot="charts">
              <div class="line" />
            </template>
            <template slot="footer">
              <span>日访问量&nbsp;1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <span>周同比&nbsp;</span>
              <i class="el-icon-top" />
              <span>日同比&nbsp;</span>
              <i class="el-icon-bottom" />
            </template>
            <template slot="footer">
              <span>日支付笔数&nbsp;5783</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78">
            <template slot="charts">
              <span>周同比&nbsp;</span>
              <i class="el-icon-top" />
              <span>日同比&nbsp;</span>
              <i class="el-icon-bottom" />
            </template>
            <template slot="footer">
              <span>日销售&nbsp;5008</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import echarts from './echarts'
export default {
  name: 'Card',
  components: { Detail }
}
</script>

<style scoped>
.el-icon-top {
  font-size: 20px;
  color: green;
}
.el-icon-bottom {
  font-size: 20px;
  color: red;
}
</style>
