<template>
  <div class="menu" style="width: 250px;height: 100%;">
    <el-row class="tac" style="height: 100%;">
      <el-col :span="12" style="width:250px;height: 100%;background-color: #545c64;">
        <el-menu
          default-active="2"
          class="el-menu-1"
          background-color="#545c64"
          text-color="#fff"
          :router=true
          active-text-color="#2d8cf0" style="height: 100%">
          <el-submenu v-for="item in menuByUserIdStore" :index="item.id+''" :key="item.id">
            <template slot="title" :index="item.url">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <!--<el-menu-item-group>-->
              <!--<template slot="title"></template>-->

              <el-menu-item  v-for="sonMenu in item.sonMenu" :route="sonMenu.url" :index="sonMenu.id+''" :key="sonMenu.id">
                <i class="el-icon-menu"></i>
                <span slot="title">{{sonMenu.name}}</span>
              </el-menu-item>
            <!--</el-menu-item-group>-->
          </el-submenu>
          <!--<el-submenu index="1">-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-location"></i>-->
              <!--<span>导航一</span>-->
            <!--</template>-->
            <!--<el-menu-item-group>-->
              <!--<template slot="title">分组一</template>-->
              <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
              <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
            <!--</el-menu-item-group>-->
            <!--<el-menu-item-group title="分组2">-->
              <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
            <!--</el-menu-item-group>-->
            <!--<el-submenu index="1-4">-->
              <!--<template slot="title">选项4</template>-->
              <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
            <!--</el-submenu>-->
          <!--</el-submenu>-->
          <!--<el-menu-item index="2">-->
            <!--<i class="el-icon-menu"></i>-->
            <!--<span slot="title">导航二</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="3" disabled>-->
            <!--<i class="el-icon-document"></i>-->
            <!--<span slot="title">导航三</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="4">-->
            <!--<i class="el-icon-setting"></i>-->
            <!--<span slot="title">导航四</span>-->
          <!--</el-menu-item>-->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: ['menuByUserIdStore'],
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
