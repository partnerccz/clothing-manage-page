<template>
  <div id="app">
    <router-view></router-view>
    <!--<keep-alive>-->
      <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
    <!--</keep-alive>-->
    <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  body {
    margin: 0;
    height: 100%;
  }
  html{
    height: 100%;
  }
  .mint-search {
    height: 100% !important;
  }
  ul{
    margin:0;
    padding: 0;
  }
  li{
    list-style-type: none;
  }
</style>
