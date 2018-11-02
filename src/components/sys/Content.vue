<template>
  <div class="content">
    <div class="center">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style scoped>
.content {
  z-index: 100;
  height: 100%;
  box-sizing:border-box;
  width: 100%;
  overflow: hidden;
  /*background-color: red;*/
}
</style>
