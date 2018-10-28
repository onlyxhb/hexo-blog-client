<template>
  <el-aside width="67px" style="overflow: hidden;-webkit-app-region: drag;">
    <el-menu
      class="aside-left-menu"
      default-active="/posts"
      :router="true"
      mode="vertical"
      background-color="#499AFA">
      <el-menu-item index="/posts">
        <el-tooltip class="item" effect="dark" content="首页" placement="right">
          <i class="el-icon-document"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="/create">
        <el-tooltip class="item" effect="dark" content="文章" placement="right">
          <i class="el-icon-edit"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="/preview">
        <el-tooltip class="item" effect="dark" content="预览" placement="right">
          <i class="el-icon-time"></i>
        </el-tooltip>
      </el-menu-item>
      <el-menu-item index="/about">
        <el-tooltip class="item" effect="dark" content="关于" placement="right">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="scss">
.aside-left-menu {
  width: 100%;
  height: 100%;
  padding-top: 55px;
  .el-menu-item {
    opacity: .5;
    -webkit-app-region: no-drag;
    i {
      color: #fff;
      font-size: 25px;
    }
    &:hover {
      background-color: #499AFA !important;
      opacity: 1;
    }
    &.is-active {
      opacity: 1;
    }
  }
}
</style>

