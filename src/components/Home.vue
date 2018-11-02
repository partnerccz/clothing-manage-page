<template>
  <div class="home">
    <div class="home-title"></div>
    <div style="display: flex;flex-direction: row;height: 100%;">
      <menus :menuByUserIdStore = "menuByUserIdStore" style="height: 100%;"></menus>
      <contents></contents>
    </div>
  </div>
</template>

<script>
import Menus from './sys/Menu'
import TopMenu from './sys/TopMenu'
import Contents from './sys/Content'
// import {mapState, mapActions} from 'vuex'
// import {MENU_LIST} from '../store/action-types'
export default {
  name: 'Home',
  components: {
    Menus,
    TopMenu,
    Contents
  },
  data: function () {
    return {
      menuByUserIdStore: null
    }
  },
  // computed: mapState({
  //   'menuByUserIdStore': 'menuByUid'
  // }),
  methods: {
    // ...mapActions({
    //   getMenusByUid: MENU_LIST
    // })
    getMenusByUserId: function () {
      this.$http.get('/menu/getMenuListByUserId', {}).then((response) => {
        console.log(response)
        this.menuByUserIdStore = response.data
      })
    }
  },
  mounted: function () {
    this.getMenusByUserId()
  }
}
</script>

<style scoped>
  .home {
    height: 100%;
    width: 100%;
  }
  .home-title {
    width: 100%;
    height: 60px;
    margin-bottom:2px;
    background-color: #545C64;
  }
</style>
