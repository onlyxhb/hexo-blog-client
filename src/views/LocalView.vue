<template>
  <el-main class="localview-main">
    <iframe src="http://localhost:4000" frameborder="0"/>
  </el-main>
</template>

<style lang="scss" scoped>
  .localview-main {
    position: relative;
    overflow: hidden;
    height: 100%;
    padding: 0;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
