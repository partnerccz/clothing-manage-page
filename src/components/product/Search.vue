<template>
  <div class="product-search">
    <el-form :inline="true" :model="searchData" ref="formSearch" label-width="80px" class="form-search">
      <el-form-item label="商品ID" prop="id">
        <el-input v-model="searchData.productId"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="searchData.productName"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model=searchData.typeId>
          <el-option label="不限" value=""></el-option>
          <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!--&lt;!&ndash;<el-form-item label="类型" prop="type">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-select v-model=searchData.type>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option label="不限" value=""></el-option>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option v-for="item in product.typeList" :key="item" :label="item" :value="item"></el-option>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--<el-form-item label="状态" prop="status">-->
        <!--<el-select v-model=searchData.status>-->
          <!--<el-option label="不限" value=""></el-option>-->
          <!--<el-option v-for="item in product.status" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker v-model="searchData.startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" :editable=false placeholder="创建开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker v-model="searchData.endTime" type="datetime" :editable=false placeholder="创建结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="search-action">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import bus, { product } from '../../common/bus.js'
import { dateFmt } from '../../common/utils.js'
export default {
  name: 'Search',
  data: function () {
    return {
      searchData: {
        productName: '',
        productId: '',
        typeId: '',
        startTime: '',
        endTime: ''
      },
      types: []
    }
  },
  methods: {
    search: function () {
      bus.$emit(product.search, Object.assign({}, this.searchData, {startTime: dateFmt(this.searchData.startTime), endTime: dateFmt(this.searchData.endTime)}))
    },
    reset: function () { // 点击重置
      this.$refs['formSearch'].resetFields()
      this.searchData.productName = ''
      this.searchData.productId = ''
      this.searchData.endTime = ''
      this.searchData.startTime = ''
      this.searchData.typeId = ''
      this.search()
    },
    getTypes: function () {
      this.$http.get('/type/getTypes').then((response) => {
        this.types = response.data
      })
    }
  },
  mounted: function () {
    this.search()
    this.getTypes()
  }
}
</script>

<style scoped>
.product-search{
  margin:20px 0 30px 20px;
}
</style>
