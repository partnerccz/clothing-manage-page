<template>
  <div id="Product-List">
    <table-search></table-search>
    <table-list></table-list>
  </div>
</template>

<script>
import TableList from './List'
import TableSearch from './Search'
export default {
  name: 'Index',
  components: {
    TableList,
    TableSearch
  }
}
</script>

<style scoped>

</style>
