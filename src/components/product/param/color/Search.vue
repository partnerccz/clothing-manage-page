<template>
<div>
  <el-form :inline="true" :model="searchData" ref="formSearch" label-width="80px" class="form-search">
    <el-form-item label="颜色规格ID" prop="id">
      <el-input v-model="searchData.id"></el-input>
    </el-form-item>
    <el-form-item label="颜色名称" prop="name">
      <el-input v-model="searchData.name"></el-input>
    </el-form-item>
    <!--<el-form-item label="开始时间" prop="startTime">-->
      <!--<el-date-picker v-model="searchData.startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" :editable=false placeholder="创建开始时间">-->
      <!--</el-date-picker>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="结束时间" prop="endTime">-->
      <!--<el-date-picker v-model="searchData.endTime" type="datetime" :editable=false placeholder="创建结束时间">-->
      <!--</el-date-picker>-->
    <!--</el-form-item>-->
    <el-form-item class="search-action">
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import bus, { productStandardColor } from '../../../../common/bus.js'
export default {
  name: 'Search',
  data: function () {
    return {
      searchData: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    search: function () {
      bus.$emit(productStandardColor.search, Object.assign({}, this.searchData))
    },
    reset: function () { // 点击重置
      this.$refs['formSearch'].resetFields()
      this.searchData.id = ''
      this.searchData.name = ''
      this.search()
    }
  }
}
</script>

<style scoped>

</style>
