<template>
  <div id="app" :style="{'height': windowHeight}">
    <el-container v-if="inited">
      <el-aside class="sidebar">
        <main-menu/>
      </el-aside>

      <el-main class="app-main">
        <el-container class="app-container">
          <el-main class="main">
            <router-view/>
          </el-main>
        </el-container>
      </el-main>
    </el-container>

    <!-- 初始化选择路径 -->
    <choose-path/>

  </div>
</template>

<script>
  import MainMenu from '@/components/MainMenu'
  import ChoosePath from '@/components/ChoosePath'

  export default {
    name: 'BlogClient',
    components: {ChoosePath, MainMenu},
    data () {
      return {
        windowHeight: '300px' // 窗口高度
      }
    },
    mounted () {
      window.addEventListener('resize', this.resize)
      this.resize()
      this.init()
      require('electron').ipcRenderer.on('jumping', (event, message) => {
        this.$router.push({ name: message })
      })
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.resize)
      this.$store.dispatch('Hexo/destroy')
    },

    methods: {
      async init () {
        await this.$store.dispatch('Hexo/start')
      },

      resize () {
        this.windowHeight = document.documentElement.clientHeight + 'px'
      }
    },

    computed: {
      inited () {
        return this.$store.state.Hexo.inited
      }
    }
  }
</script>

<style lang="scss" scoped>
// 整体样式
#app {
  display: flex;
  flex-direction: row;
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  // 左侧sidebar样式
  .sidebar {
    overflow: hidden;
    width: 80px !important;
    text-align: center;
    background-color: #5576BD;
    cursor: pointer;
    -webkit-app-region: drag;
  }
  // 右侧内容区域样式
  .app-main {
    height: 100%;
    padding: 0px;
    .app-container {
      width: 100%;
      height: 100%;
      padding: 0px;
      .main {
        height: 100%;
        padding: 0px;
      }
    }
  }
}
</style>
