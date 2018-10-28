<template>
  <div class="header-box">
    <div class="header-box-left">
      <el-input
        placeholder="请输入关键词搜索"
        prefix-icon="el-icon-search"
        v-model="keyword"
        @input = "setKeyWord">
      </el-input>
    </div>
    <div class="header-box-right">
      <ul class="operate">
        <li class="refresh-article" @click="openSite">
          <el-tooltip class="item" effect="dark" content="打开博客" placement="bottom">
            <i class="el-icon-view"></i>
          </el-tooltip>
        </li>
        <li class="refresh-article" @click="$electron.ipcRenderer.send('window-refresh')">
          <el-tooltip class="item" effect="dark" content="刷新页面" placement="bottom">
            <i class="el-icon-refresh"></i>
          </el-tooltip>
        </li>
        <li class="refresh-setting" @click="generateAndDeploy">
          <el-tooltip class="item" effect="dark" content="编译发布" placement="bottom">
            <i class="el-icon-upload"></i>
          </el-tooltip>
        </li>
        <li class="refresh-setting" @click="$router.push('settings')">
          <el-tooltip class="item" effect="dark" content="系统设置" placement="bottom">
            <i class="el-icon-setting"></i>
          </el-tooltip>
        </li>
        <li class="user-photo">
          <img src="build/icons/icon.ico" alt="">
        </li>
        <li class="vertical-line"></li>
        <li class="operate-min" @click="$electron.ipcRenderer.send('window-min')">
          <i class="el-icon-minus"></i>
        </li>
        <li class="operate-max" @click="$electron.ipcRenderer.send('window-max')">
          <i class="el-icon-rank"></i>
        </li>
        <li class="operate-clo" @click="$electron.ipcRenderer.send('window-close')">
          <i class="el-icon-close"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        keyword: ''
      }
    },
    methods: {
      setKeyWord () {
        this.$store.commit('Hexo/setKeyWord', this.keyword)
      },
      openSite () {
        let url = this.$store.state.Hexo.instance.config.url
        this.$electron.shell.openExternal(url)
      },
      async generateAndDeploy () {
        let loading = this.$loading({
          lock: true,
          text: '生成中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        let hexo = this.$store.state.Hexo.instance
        try {
          await hexo.call('generate', {})
          loading.text = '发布中...'
          try {
            await hexo.call('deploy', {})
            this.$notify.success('发布成功')
          } catch (e) {
            console.error(e)
            this.$notify.error('发布失败')
          } finally {
            loading.close()
          }
        } catch (err) {
          loading.close()
          console.error(err)
          this.$notify.error('生成失败')
        }
      }
    }
  }
</script>
<style lang="scss">
.header-box {
  -webkit-app-region: drag;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
  &-left {
    float: left;
    width: 270px;
    padding: 0 5px;
    box-sizing: border-box;
    -webkit-app-region: no-drag;
    .el-input__inner {
      border: none;
      outline: line;
      &:focus {
        background: #f5f6f7;
      }
    }
  }
  &-right {
    float: right;
    .operate {
      display: flex;
      flex-direction: row;
      margin: 0;
      li {
        margin-right: 8px;
        padding: 0 10px;
        cursor: pointer;
        list-style: none;
        -webkit-app-region: no-drag;
        &:hover {
          color: #499AFA;
        }
        &.vertical-line {
          padding: 0;
          border-right: 1px solid #EDEDED;
        }
        &.user-photo img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>

