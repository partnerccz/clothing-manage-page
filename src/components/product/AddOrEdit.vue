<template>
<el-dialog title="商品编辑/添加" :modal="false" :visible="showDialog" @update:visible="(val) => $emit('update:showDialog', val)" :close-on-click-modal=false @open="show" @close="reset">
  <el-form ref="form" :model="product" :rules="rules" label-width="100px" label-position="right" class="form-style">
    <el-form-item v-if="this.editRowId !== null" label="商品ID" prop="id">{{product.id}}</el-form-item>
    <el-form-item label="商品名" prop="name">
      <el-input v-model="product.name"></el-input>
    </el-form-item>
    <el-form-item label="分类名" prop="types">
      <el-select v-model="product.type" multiple filterable placeholder="请选择">
        <el-option v-for="item in productType" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="尺寸" prop="standardSize" >
      <el-tag v-for="item in standardSize" :key="item.id" :value="item.id" style="margin:10px;" @click.native="selectStandardSize(item)">
        {{item.name}}
      </el-tag>
    </el-form-item>
     <el-form-item label="颜色" prop="standardColor" >
       <el-tag v-for="item in standardColor" :key="item.id" :value="item.id" style="margin:10px;" @click.native="selectStandardColor(item)">
        {{item.name}}
       </el-tag>
     </el-form-item>
    <el-form-item label="规格" prop="standardColor" >
      <el-tag type="warning" v-for="(item, index) in colorSizeGroup" :key="item.id" :value="item.id" style="margin:10px;" closable @close="handleClose(index)">
        {{item.name}}
      </el-tag>
    </el-form-item>
    <!--<el-form-item label="植物属类" prop="fruit_type">-->
      <!--<el-select v-model="product.fruit_type" filterable placeholder="请选择">-->
        <!--<el-option v-for="item in productStore.fruitTypeList" :key="item" :label="item" :value="item"></el-option>-->
      <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="搜索关键字" prop="keywords">-->
      <!--<el-tag :key="item" v-for="item in product.keywords" closable :disable-transitions="false" @close="deleteKeywords(item)">{{item}}</el-tag>-->
      <!--<el-input v-if="isAddKeywordsShow" class="input-new-tag" v-model="addKeywords" ref="addKeywordsInput" size="small" @keyup.enter.native="handleKeywordsConfirm" @blur="handleKeywordsConfirm"></el-input>-->
      <!--<el-button v-else size="small" @click="showAddKeywords">+ New Tag</el-button>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="产地" prop="produceArea">-->
      <!--<el-cascader v-model="product.produceArea" placeholder="请选择产地" :options="productStore.productionInfoList" filterable change-on-select></el-cascader>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="显示顺序" prop="sort">-->
      <!--<el-input-number v-model="product.sort" :min="1" :max="9999999"></el-input-number>-->
      <!--<span>越大越靠前</span>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="品牌" prop="brand">-->
      <!--<el-input v-model="product.brand"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="标签" prop="recommendTypes">-->
      <!--<el-checkbox-group v-model="product.recommendTypes">-->
        <!--<el-checkbox v-for="item in productStore.recommendList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>-->
      <!--</el-checkbox-group>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="销售单位" prop="measure_unit">-->
      <!--<el-select v-model="product.measure_unit" placeholder="请选择">-->
        <!--<el-option v-for="item in productStore.measureUnitList" :key="item" :label="item" :value="item"></el-option>-->
      <!--</el-select>-->
    <!--</el-form-item>-->
    <el-form-item label="上架" prop="status">
      <el-radio-group v-model="product.status">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <!--<el-form-item label="保鲜期" prop="fresh_time">-->
      <!--<el-select v-model="product.fresh_time" placeholder="请选择">-->
        <!--<el-option v-for="item in productStore.freshMinuteList" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
      <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="果品特征" prop="fruit_des">-->
      <!--<el-input v-model="product.fruit_des"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="保藏方法" prop="store_way">-->
      <!--<el-input v-model="product.store_way"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="本周商家购买数量" prop="week_sell_num">-->
      <!--<el-input v-model="product.week_sell_num"></el-input>-->
    <!--</el-form-item>-->
    <el-form-item label="图片" prop="imgs">
      <el-upload :action="_uploadFilePath" list-type="picture-card" :limit="20"
                 :file-list="product.imgs" :on-remove="handleRemoveImg"
                 :on-success="handleAvatarScucess" :before-upload="beforeAvatarUpload">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:showDialog', false)">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
  name: 'AddOrEdit',
  props: ['showDialog', 'editRowId'],
  data: function () {
    return {
      product: {
      },
      productType: [],
      rules: {
      },
      resetForm: {
        status: 1
      },
      standardColor: [],
      standardSize: [],
      colorGroup: [],
      sizeGroup: [],
      colorSizeGroup: [],
      colorSize: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    show: function () {
      console.log('show')
      this.reset()
      this.getStandardColor()
      this.getStandardSize()
      if (this.editRowId !== null) {
      }
      this.$http.get('/type/getTypes').then((response) => {
        this.productType = response.data
      })
    },
    reset: function () {
      if (this.$refs['form']) { // 重置校验错误，必须执行，否则页面组件有问题
        this.$refs['form'].resetFields()
      }
      this.product = Object.assign({}, this.resetForm)
    },
    getStandardColor: function () {
      this.$http.get('/standardColor/getStandardColors').then((response) => {
        this.standardColor = response.data
      })
    },
    getStandardSize: function () {
      this.$http.get('/standardSize/getStandardSizes').then((response) => {
        this.standardSize = response.data
      })
    },
    selectStandardColor: function (item) {
      // console.log('standardColor.name' + this.colorGroup)
      // let colorGroupLength = this.colorGroup.length
      // let sizeItem = this.sizeGroup[colorGroupLength]
      // console.log('colorGroupLength:' + colorGroupLength)
      // console.log('sizeItem.name:' + (typeof (sizeItem) === 'undefined' ? 'undefined' : sizeItem.name))
      // if (typeof (sizeItem) !== 'undefined' && sizeItem !== null) {
      //   let newName = sizeItem.name + '*' + item.name
      //   this.colorSize.name = newName
      //   this.colorSize.id = sizeItem.id + '*' + item.id
      //   this.colorSizeGroup.push(this.colorSize)
      //   console.log(this.colorSizeGroup)
      // }
      this.colorGroup.push(item)
      this.getColorAndSizeGroup()
    },
    selectStandardSize: function (item) {
      // console.log('standardSize.name' + this.sizeGroup)
      // let sizeGroupLength = this.sizeGroup.length
      // let sizeItem = this.colorGroup[sizeGroupLength]
      // console.log('sizeGroupLength:' + sizeGroupLength)
      // console.log('sizeItem.name:' + (typeof (sizeItem) === 'undefined' ? 'undefined' : sizeItem.name))
      // if (typeof (sizeItem) !== 'undefined' && sizeItem !== null) {
      //   this.colorSize.name = sizeItem.name + '*' + item.name
      //   this.colorSize.id = sizeItem.id + '*' + item.id
      //   this.colorSizeGroup.push(this.colorSize)
      //   console.log(this.colorSizeGroup)
      // }
      this.sizeGroup.push(item)
      this.getColorAndSizeGroup()
    },
    getColorAndSizeGroup: function () {
      for (let i = 0; i < this.sizeGroup.length; i++) {
        let sizeGroup = this.sizeGroup[i]
        for (let j = 0; j < this.colorGroup.length; j++) {
          let colorGroup = this.colorGroup[j]
          if (i === j) {
            let colorSize = this.colorSizeGroup[i]
            if (typeof (colorSize) === 'undefined' || colorSize === null) {
              this.colorSize.name = sizeGroup.name + '*' + colorGroup.name
              this.colorSize.id = sizeGroup.id + '*' + colorGroup.id
              this.colorSizeGroup.push(this.colorSize)
            }
          }
        }
      }
    },
    handleClose: function (index) {
      if (index > -1) {
        this.colorSizeGroup.splice(index, 1)
      }
    },
    onSubmit: function () {
      console.log('onSubmit')
    },
    handleRemoveImg: function (file, fileList) {
      this._imgUploadChange(file, fileList)
    },
    _imgUploadChange: function (file, fileList) {
      this.product.imgs = []
      for (let img of fileList) {
        this.product.imgs.push({url: img.response ? this._downloadFilePath + img.response : img.url})
      }
    },
    handleAvatarScucess: function (response, file, fileList) {
      if (response) {
        this._imgUploadChange(file, fileList)
      } else {
        this.$message.error('该图片不支持上传，请更换一张！')
      }
    },
    beforeAvatarUpload: function (file) {
      const isRightType = file.type.indexOf('image/') === 0
      if (!isRightType) {
        this.$message.error('上传图标必须为图片格式!')
      }
      const isRightSize = file.size / 1024 / 1024 < 5
      if (!isRightSize) {
        this.$message.error('上传图标大小不能超过 5MB!')
      }
      return isRightSize && isRightType
    }
  },
  mounted: function () {
    this.show()
  }
}
</script>

<style scoped>

</style>
