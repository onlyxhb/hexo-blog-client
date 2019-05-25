<template>
  <el-main class="localview-main">
    <iframe src="http://localhost:4000" frameborder="0"/>
  </el-main>
</template>

<script>
import Operation from '@/components/Operation'
const electron = require('electron')
export default {
  components: { Operation },
}
</script>

<style lang="scss" scoped>
  .localview-main {
    position: relative;
    height: 100%;
    padding: 0;
    iframe {
      width: 100%;
      height: 100%;      
    }
  }
</style>
