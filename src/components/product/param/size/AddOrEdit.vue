<template>
<el-dialog title="颜色规格编辑/添加" :modal="false" :visible="showDialog" @update:visible="(val) => $emit('update:showDialog', val)" :close-on-click-modal=false @open="show" @close="reset">
  <el-form ref="form" :model="standardSize" :rules="rules" label-width="100px" label-position="right" class="form-style">
    <el-form-item v-if="this.editRowId !== null" label="商品ID" prop="id">{{standardSize.id}}</el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="standardSize.name"></el-input>
    </el-form-item>
    <el-form-item label="大小" prop="size">
      <el-input v-model="standardSize.size"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:showDialog', false)">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
import bus, { productStandardSize} from '../../../../common/bus.js'
export default {
  name: 'AddOrEdit',
  props: ['showDialog', 'editRowId'],
  data: function () {
    return {
      rules: {
      },
      resetForm: {
      },
      standardSize: []
    }
  },
  methods: {
    show: function () {
      this.reset()
      if (this.editRowId !== null) {
        this.$http.get('/standardSize/getStandardSizeById', {params: {id: this.editRowId}}).then((response) => {
          this.standardSize = response.data
        })
      }
    },
    reset: function () {
      if (this.$refs['form']) { // 重置校验错误，必须执行，否则页面组件有问题
        this.$refs['form'].resetFields()
      }
      this.standardSize = Object.assign({}, this.resetForm)
    },
    onSubmit: function () {
      this.$refs['form'].validate((valid) => {
        if (!valid) { return false }
        let postData = Object.assign(this.resetForm, this.standardSize)
        this.$http.post('/standardSize/addStandardSize', postData, {showLoading: true}).then((response) => {
          this.$emit('update:showDialog', false) // 关闭弹窗
          if (this.standardSize.id !== '') { // 编辑完成（刷新列表当前页）
            this.$message({type: 'success', message: '编辑数据成功'})
            bus.$emit(productStandardSize.edit, postData)
          } else { // 新增完成（跳到第一页）
            this.$message({type: 'success', message: '添加数据成功'})
            bus.$emit(productStandardSize.add, postData)
          }
        })
      })
    }
  },
  mounted: function () {
    this.show()
  }
}
</script>

<style scoped>

</style>
