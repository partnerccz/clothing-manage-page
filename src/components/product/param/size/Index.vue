<template>
  <div id="product-param-size">
    <search></search>
    <table-list></table-list>
  </div>
</template>

<script>
import TableList from './List'
import Search from './Search'
export default {
  name: 'Index',
  components: {
    TableList,
    Search
  }
}
</script>

<style scoped>

</style>
