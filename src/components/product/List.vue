<template>
  <div>
    <!--@row-dblclick="showStandardList"-->
    <!--@selection-change="selectChange"-->
    <!--:default-sort="orderInfo"-->
    <!--@sort-change="sortChange"-->
    <el-table :data="tableData"
              highlight-current-row style="width: 100%"
              :header-row-class-name="tableHeaderClassName"
              :row-class-name="tableRowClassName">
      <el-table-column type="selection" width="55"></el-table-column>
      <!--<el-table-column fixed type="index" label="序号" width="70"></el-table-column>-->
      <el-table-column fixed prop="id" label="ID" min-width="50"></el-table-column>
      <!--<el-form-item label="商品图片" prop="img">-->
        <!--<img :src="product.img" width="100px;" height="100px;"/>-->
      <!--</el-form-item>-->
      <el-table-column fixed label="商品图片" min-width="80">
        <template slot-scope="scope">
          <img :src="scope.row.img" width="80px" height="80px"/>
        </template>
      </el-table-column>
      <el-table-column fixed prop="name" label="商品名称" min-width="180"></el-table-column>
      <el-table-column fixed prop="brand" label="品牌" min-width="70"></el-table-column>
      <el-table-column fixed prop="typeName" label="类型" min-width="70"></el-table-column>
      <el-table-column fixed prop="des" label="描述" min-width="100"></el-table-column>
      <el-table-column fixed prop="store_way" label="库存" min-width="50"></el-table-column>
      <el-table-column fixed prop="total_sell_num" label="售卖数量" min-width="50"></el-table-column>
      <el-table-column fixed prop="create_time" label="创建时间" min-width="120"></el-table-column>
      <!--<el-table-column fixed prop="name" label="名称" min-width="70"></el-table-column>-->
      <!--<el-table-column fixed prop="name" label="名称" min-width="100">-->
        <!--<template slot-scope="scope">-->
          <!--<el-popover v-if="scope.row.errorInfo" trigger="hover" placement="top">-->
            <!--<p>{{ scope.row.errorInfo }}</p>-->
            <!--<div slot="reference" style="color: red;">-->
              <!--{{ scope.row.name }}-->
            <!--</div>-->
          <!--</el-popover>-->
          <!--<div v-else>-->
            <!--{{ scope.row.name }}-->
          <!--</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="country" label="国家" min-width="70"></el-table-column>-->
      <!--<el-table-column prop="brand" label="品牌" min-width="70"></el-table-column>-->
      <!--<el-table-column prop="fruit_type" label="水果类型" show-overflow-tooltip min-width="100"></el-table-column>-->
      <!--<el-table-column sortable prop="sort" label="排序" min-width="50"></el-table-column>-->
      <!--<el-table-column sortable prop="fresh_time" label="保鲜时长(天)" width="90" :formatter="formatterFreshTime"></el-table-column>-->
      <!--<el-table-column prop="fruit_des" label="果品特征" width="180"></el-table-column>-->
      <!--<el-table-column prop="store_way" label="存储方式" width="180"></el-table-column>-->
      <!--<el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>-->
      <!--<el-table-column prop="update_time" label="更新时间" width="180"></el-table-column>-->
      <!--<el-table-column fixed="right" prop="total_sell_num" label="总销量" width="70"></el-table-column>-->
      <!--<el-table-column fixed="right" prop="week_sell_num" label="周销量" width="70"></el-table-column>-->
      <!--<el-table-column fixed="right" prop="status" label="状态" width="70">-->
        <!--<template slot-scope="scope">-->
          <!--<el-switch v-model="scope.row.status" :active-value=1 :inactive-value=0 @change="val => setStatus(val, scope.row.id)"></el-switch>-->
          <!--&lt;!&ndash;<el-tag :type="scope.row.status === 1 ? 'success' : 'gray'" close-transition>{{scope.row.status === 1 ? '启用' :  '禁用'}}</el-tag>&ndash;&gt;-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope" style="display: flex;flex-direction: row;width: 100%;text-align: center;">
          <el-button @click="edit(scope.row)" size="small" type="primary">编辑</el-button>
          <el-button @click="market(scope.row)"  size="small" type="primary">详情</el-button>
          <!--<el-button @click="setStatus(scope.row.status === 1 ? 0 : 1, [scope.row.id])" type="text" size="small" :class="scope.row.status === 1 ? 'disable' : 'enable'">{{scope.row.status === 1 ? '禁用' : '启用'}}</el-button>-->
          <!--<el-button @click="setStatus(-1, [scope.row.id])"  size="small" class="delete">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="pageInfo.totalRec" class="table-pager">
    </el-pagination>
    <component :is="editCompName" :showDialog.sync="showEdit" :editRowId="editRowId"></component>
  </div>
</template>

<script>
import {localStorageKeys} from '../../common/const.js'
import bus, { product } from '../../common/bus.js'
export default {
  name: 'List',
  data: function () {
    let pageSize = localStorage.getItem(localStorageKeys.productPageSize)
    return {
      editCompName: '', // 用于动态加载组件
      showEdit: false, // 是否展示编辑窗口
      editRowId: null, // 编辑的记录ID
      tableData: [],
      productExtension: {
      },
      searchData: {
      },
      pageInfo: {
        pageNum: 1,
        totalRec: 0,
        pageSize: pageSize == null ? 10 : parseInt(pageSize)
      }
    }
  },
  components: {
    productEdit: resolve => {
      require(['./AddOrEdit'], resolve)
    }
  },
  methods: {
    search: function (data) {
      this.resetPageInfo()
      this.searchData = data
      this.getProducts()
    },
    resetPageInfo: function () { // 重置分页参数
      this.pageInfo.totalRec = 0
      this.pageInfo.pageNum = 1
    },
    getProducts: function () {
      this.$http.post('/product/getProductsByPage', Object.assign({}, this.searchData, this.pageInfo)).then((response) => {
        console.log(response)
        this.tableData = response.data.list
        this.pageInfo.totalRec = response.data.total
      })
    },
    tableRowClassName: function ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    tableHeaderClassName: function ({row, rowIndex}) {
      return 'redStyle'
    },
    handleCurrentChange: function (val) { // 页码改变时重新加载记录
      this.pageInfo.pageNum = val
      this.getProducts()
    },
    handleSizeChange: function (val) { // 每页条数改变时重新加载记录
      this.pageInfo.pageSize = val
      localStorage.setItem(localStorageKeys.productPageSize, val)
      this.getProducts()
    },
    edit: function (row) { // 显示编辑窗口
      this.editCompName = 'productEdit'
      this.editRowId = row.id
      this.showEdit = true
    }
  },
  created: function () {
    bus.$on(product.search, (searchData) => { // 监听外部查询数据事件
      this.search(searchData)
    })
  },
  mounted: function () {
    this.getProducts()
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }
  .redStyle{background: red;}

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
