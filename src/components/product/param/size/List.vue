<template>
<div>
  <el-button type="primary" size="small" @click="add">添加</el-button>
  <el-button type="danger" size="small" @click="setStatus(-1)">批量删除</el-button>
  <el-table :data="tableData"
            highlight-current-row style="width: 100%"
            :header-row-class-name="tableHeaderClassName"
            :row-class-name="tableRowClassName"
            @selection-change="selectChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column fixed prop="id" label="ID" min-width="50"></el-table-column>
    <el-table-column fixed prop="name" label="名称" min-width="120"></el-table-column>
    <el-table-column fixed prop="size" label="大小" min-width="120"></el-table-column>
    <el-table-column fixed prop="create_time" label="创建时间" min-width="120"></el-table-column>
    <el-table-column fixed="right" label="操作" width="150" align="center">
      <template slot-scope="scope" style="display: flex;flex-direction: row;width: 100%;text-align: center;">
        <el-button @click="edit(scope.row)" size="small" type="primary">编辑</el-button>
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
    :total="pageInfo.totalRec" class="table-pager" style="padding-top: 15px;padding-left: 15px;">
  </el-pagination>
  <component :is="editCompName" :showDialog.sync="showEdit" :editRowId="editRowId"></component>
</div>
</template>

<script>
import {localStorageKeys} from '../../../../common/const.js'
import bus, {productStandardSize} from '../../../../common/bus.js'
export default {
  name: 'List',
  components: {
    standardSizeEdit: resolve => {
      require(['./AddOrEdit'], resolve)
    }
  },
  created: function () {
    bus.$on(productStandardSize.search, (searchData) => { // 监听外部查询数据事件
      this.search(searchData)
    })
    bus.$on(productStandardSize.edit, () => { // 监听数据更改后的列表刷新（刷新当前页）
      this.getStandardSize()
    })
    bus.$on(productStandardSize.add, () => { // 监听数据添加后的列表刷新
      this.resetPageInfo()
      this.getStandardSize()
    })
  },
  data: function () {
    let pageSize = localStorage.getItem(localStorageKeys.productSizeSize)
    return {
      editCompName: '',
      showEdit: false,
      editRowId: '',
      tableData: [],
      searchData: {
      },
      pageInfo: {
        pageNum: 1,
        totalRec: 0,
        pageSize: pageSize == null ? 10 : parseInt(pageSize)
      },
      selectIds: []
    }
  },
  methods: {
    search: function (data) {
      this.resetPageInfo()
      this.searchData = data
      this.getStandardSize()
    },
    getStandardSize: function () {
      this.$http.post('/standardSize/getStandardSizeByPage', Object.assign({}, this.searchData, this.pageInfo)).then((response) => {
        console.log(response)
        this.tableData = response.data.list
        this.pageInfo.totalRec = response.data.total
      })
    },
    resetPageInfo: function () { // 重置分页参数
      this.pageInfo.totalRec = 0
      this.pageInfo.pageNum = 1
    },
    tableHeaderClassName: function ({row, rowIndex}) {
      return 'redStyle'
    },
    tableRowClassName: function ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleCurrentChange: function (val) { // 页码改变时重新加载记录
      this.pageInfo.pageNum = val
      this.getStandardSize()
    },
    handleSizeChange: function (val) { // 每页条数改变时重新加载记录
      this.pageInfo.pageSize = val
      localStorage.setItem(localStorageKeys.productSizeSize, val)
      this.getStandardSize()
    },
    add: function () { // 添加记录
      this.editCompName = 'standardSizeEdit'
      this.editRowId = null
      this.showEdit = true
    },
    edit: function (item) {
      this.editCompName = 'standardSizeEdit'
      this.editRowId = item.id
      this.showEdit = true
    },
    selectChange: function (selectRows) { // 每次选择行时，更新选择的记录ID
      this.selectIds.splice(0, this.selectIds.length) // 清空选择的id
      for (let i = 0; i < selectRows.length; i++) {
        this.selectIds.push(selectRows[i].id)
      }
    },
    setStatus: function (status, selectIds) { // 请求服务器设置状态
      selectIds = selectIds || this.selectIds
      if (selectIds.length === 0) {
        this.$alert('未选择记录', '提示', {confirmButtonText: '确定', closeOnClickModal: true, type: 'warning'})
        return
      }
      if (status === -1) { // 如果是删除，则提示
        this.$confirm('确认要删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._setStatus(status, selectIds)
        }).catch(() => {
        })
      } else {
        this._setStatus(status, selectIds)
      }
    },
    _setStatus: function (status, selectIds) {
      this.$http.post('/standardSize/delSizes', {ids: selectIds, status: status}).then((response) => {
        this.getStandardSize()
      }).catch((e) => { // 异常后重新获取数据，正确显示状态
        this.getStandardSize()
      })
    }
  },
  mounted: function () {
    this.getStandardSize()
  }
}
</script>

<style scoped>

</style>
