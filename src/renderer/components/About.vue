<template>
  <el-main>
    <div class="about-content">
      <div>
        <h3>说明：这个项目是为了自用，自己的hexo博客新增文章一直使用命令然后再发布，这种命令行的方式很烦而且还不方便，本着分享共同成长的目的，开源了此项目，<span style="color: red;font-weight: bold;">欢迎各位同仁发扬光大</span>。</h3>
        <ul>
          <li>GitLab：<a @click="openUrl('https://gitlab.com/onlystar/hexo-blog.git')" href="#">https://gitlab.com/onlystar/hexo-blog.git</a>
          </li>
          <li>Blog：<a @click="openUrl('https://blog.onlystar.site')" href="#">https://blog.onlystar.site</a></li>
        </ul>
      </div>
      <div>
        <h3>使用框架</h3>
        <ul>
          <li><a @click="openUrl('https://cn.vuejs.org')" href="#">Vue.js</a></li>
          <li><a @click="openUrl('https://github.com/electron/electron')" href="#">electron</a></li>
          <li><a @click="openUrl('https://github.com/SimulatedGREG/electron-vue')" href="#">electron-vue</a></li>
          <li><a @click="openUrl('http://element-cn.eleme.io')" href="#">element-ui</a></li>
        </ul>
      </div>
    </div>
  </el-main>
</template>

<script>
  import MainMenu from './MainMenu'

  export default {
    components: {MainMenu},
    data () {
      return {}
    },
    created () {
    },
    methods: {
      openUrl (url) {
        require('electron').shell.openExternal(url)
      }
    }
  }
</script>

<style scoped>
  .about-content {
    margin: 50px;
    font-size: 15px;
    font-family: Georgia, "Times New Roman", Times, Kai, "Kaiti SC", KaiTi, BiauKai, "FontAwesome", serif;
  }

  .about-content ul li {
    padding: 3px;
  }
</style>
