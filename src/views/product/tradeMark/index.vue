<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px" @click="showDialog">添加</el-button>
    <el-table :data="list" style="margin:10px 0px" border>
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column prop="tmName" label="品牌名称" width="200px" align="center" />
      <el-table-column prop="logoUrl" label="品牌Logo" width="width" align="center">
        <template slot-scope="{ row }">
          <!-- {{ row }}-{{ $index }} -->
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img :src="row.logoUrl" alt style="width: 150px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{row}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="limit"
      layout="total, prev, pager, next,jumper, -> ,sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog :title="tmForm.id? '修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" style="width:80%" :model="tmForm" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌logo" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    // 自定义校验规则
    const validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        return callback(new Error('品牌名称为2-10位'))
      } else {
        callback()
      }
    }
    const validateLogoUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择logo'))
      } else {
        callback()
      }
    }
    return {
      page: 1,
      limit: 10,
      total: 0,
      list: [],
      dialogFormVisible: false, // dialog默认状态
      tmForm: {
        // 收集dialog数据
        tmName: '',
        logoUrl: ''
      },
      rules: {
        tmName: [
          { required: true, trigger: 'blur', validator: validateTmName }
        ],
        logoUrl: [
          { required: true, trigger: 'blur', validator: validateLogoUrl }
        ]
      }
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    // 每页条数
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    // 跳转页面
    handleCurrentChange(pager) {
      this.page = pager
      this.getPageList(this.page)
    },
    // 获取品牌列表数据
    async getPageList(pager = 1) {
      this.page = pager
      const { page, limit } = this
      const result = await this.$API.trademark.reqTradeMarkList(page, limit)
      if (result.code == 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    // 添加品牌
    showDialog() {
      this.dialogFormVisible = true
      this.tmForm = { tmName: '', logoUrl: '' }
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // console.log(res, file)
      this.tmForm.logoUrl = res.data
    },
    //  图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type == 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$notify.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$notify.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 新增或者修改品牌
    addOrUpdateTradeMark() {
      // eslint-disable-next-line space-before-function-paren
      this.$refs.ruleForm.validate(async (valid) => {
        // 表单校验
        if (valid) {
          this.dialogFormVisible = false
          const result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          )
          if (result.code == 200) {
            this.$notify.success(
              this.tmForm.id ? '修改品牌成功' : '添加品牌成功'
            )
            this.getPageList(this.tmForm.id ? this.page : 1)
          } else {
            console.log('error submit!!')
            return false
          }
        }
      })
    },
    // 修改品牌
    updateTradeMark(row) {
      this.dialogFormVisible = true
      this.tmForm = { ...row }
    },
    // 删除品牌
    deleteTradeMark(row) {
      this.$confirm(`是否要删除品牌：${row.tmName}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          const result = await this.$API.trademark.reqDeleteTradeMark(row.id)
          if (result.code == 200) {
            this.$notify.success('删除成功')
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
          }
        })
        .catch(() => {
          this.$notify.warning('已取消删除')
        })
    }
  }
}
</script>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
