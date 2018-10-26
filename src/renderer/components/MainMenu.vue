<template>
  <el-menu
      :router="true"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="'/' + $route.path.split('/')[1]">
    <el-menu-item index="/posts">
      <i class="el-icon-document"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/create">
      <i class="el-icon-edit"></i>
      <span slot="title">文章</span>
    </el-menu-item>
    <el-menu-item index="/preview">
      <i class="el-icon-time"></i>
      <span slot="title">预览</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <span slot="title">配置</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <i class="el-icon-info"></i>
      <span slot="title">关于</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
  }
</style>

