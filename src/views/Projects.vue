<template>
  <el-main class="projects-main">
    <operation/>
    <div class="projects-main-header">
      <div class="info">
        <h1>blog.onlystar.site</h1>
        <p class="server">
          <span>本地服务器:</span>
          <a @click.stop="openBlog">{{blogUrl}}</a>
          <span :class="['tip', isRunning ? 'run' : 'stop' ]">预览中</span>
        </p>
      </div>
    </div>
    <div class="projects-main-content">
      <iframe src="https://www.baidu.com" frameborder="0"/>
    </div>
  </el-main>
</template>

<script>
import Operation from '@/components/Operation'
const electron = require('electron')
export default {
  components: { Operation },
  data () {
    return {
      isRunning: true,
      blogUrl: 'http://172.16.21.27:4444/'
    }
  },
  methods: {
    openBlog () {
      electron.shell.openExternal(this.blogUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
  .projects-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    &-header {
      position: relative;
      width: 100%;
      height: 40px;
      border-top: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      .info {
        position: absolute;
        display: flex;
        align-items: center;
        top: -62px;
        padding: 0 15px;
        font-size: 18px;
        .server {
          height: 25px;
          margin-left: 15px;
          line-height: 25px;
          font-size: 13px;
          a {
            color: rgb(120,147,245);
            cursor: pointer;
          }
          .tip {
            position: relative;
            top: -2px;
            margin-left: 15px;
            padding: 3px 8px;
            background-color: #5576BD;
            color: #fff;
            font-size: 11px;
          }
        }
      }
    }
    &-content {
      overflow: auto;
      flex: 1;
      width: 100%;
      iframe {
        width: 100%;
        height: 800px;
      }
    }
  }
</style>
