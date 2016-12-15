<template>
  <div class="container">
    <filelist></filelist>
  </div>
</template>

<script>
import filelist from './components/filelist.vue'

export default {
  name: 'app',
  components: {
    filelist
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
