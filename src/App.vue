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
import Utils from '@/service/Utils'
import { mapMutations } from 'vuex'
import Config from '@/config'
const autoUpdate = Config.get('autoUpdate', true)
export default {
  name: 'BlogClient',
  components: { ChoosePath, MainMenu },
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
      if (message === 'checkVersion') {
        Utils.checkVersion()
      } else if (message === 'addArticle') {
        this.changeType('add')
        this.$router.push({ name: 'main' })
      } else {
        this.$router.push({ name: message })
      }
    })
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
    this.$store.dispatch('Hexo/destroy')
  },

  methods: {
    ...mapMutations({
      changeType: 'Article/changeType'
    }),
    async init () {
      await this.$store.dispatch('Hexo/start')
      if (autoUpdate) {
        Utils.checkVersion(true)
      }
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
  flex: 1;
  flex-direction: row;
  min-width: 0;
  box-sizing: border-box;
  // 左侧sidebar样式
  .sidebar {
    overflow: hidden;
    width: 80px !important;
    text-align: center;
    background-color: #5576bd;
    cursor: pointer;
    -webkit-app-region: drag;
  }
  // 右侧内容区域样式
  .app-main {
    height: 100%;
    padding: 0;
    .app-container {
      width: 100%;
      height: 100%;
      padding: 0;
      .main {
        height: 100%;
        padding: 0;
      }
    }
  }
}
</style>
