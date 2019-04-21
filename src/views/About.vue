<template>
  <el-main>
    <operation/>
    <div class="about-content main-scrollbar">
      <div>
        <h3>说明</h3>
        <p>
            这个项目纯粹为了自用，个人hexo博客新增文章一直使用命令然后再发布，这种命令行的方式很烦而且还不方便。本项目基于<a @click="openUrl('https://github.com/gaoyoubo/hexo-client.git')" href="#">https://github.com/gaoyoubo/hexo-client.git</a>项目二次开发，欢迎各位同仁加入一起完善。
        </p>
      </div>
      <div>
        <h3>项目地址</h3>
        <ul>
          <li>
            Github
            <a @click="openUrl('https://github.com/Xonlystar/hexo-vue-client.git')" href="#">https://github.com/Xonlystar/hexo-vue-client.git</a>
          </li>
          <li>Blog：<a @click="openUrl('http://blog.onlystar.site')" href="#">http://blog.onlystar.site</a></li>
        </ul>
      </div>
      <div>
        <h3>使用帮助</h3>
        <ul>
          <li>帮助文档：<a @click="openUrl('https://www.mspring.org/2018/11/29/HexoClient%E4%BD%BF%E7%94%A8%E5%B8%AE%E5%8A%A9/')" href="#">点击查看帮助文档</a></li>
          <li>提交问题：<a @click="openUrl('https://github.com/Xonlystar/hexo-blog-client/issues/new')" href="#">点击提交问题</a></li>
        </ul>
      </div>
      <div>
        <h3>站在巨人肩上</h3>
        <ul>
          <li><a @click="openUrl('https://github.com/electron/electron')" href="#">electron</a></li>
          <li><a @click="openUrl('https://cn.vuejs.org')" href="#">Vue.js</a></li>
          <li><a @click="openUrl('https://github.com/SimulatedGREG/electron-vue')" href="#">electron-vue</a></li>
          <li><a @click="openUrl('http://element-cn.eleme.io')" href="#">element-ui</a></li>
          <li><a @click="openUrl('https://github.com/hinesboy/mavonEditor')" href="#">mavonEditor</a></li>
          <li><a @click="openUrl('https://nklayman.github.io/vue-cli-plugin-electron-builder/')" href="#">vue-cli-plugin-electron-builder</a></li>
        </ul>
      </div>
      <div>
        <h3>捐赠</h3>
        <div class="juanzeng">
          <img src="../assets/images/alipay.jpg">
          <div class="txt">
            <span>支付宝</span>
          </div>
        </div>
        <div class="juanzeng">
          <img src="../assets/images/wechat.png">
          <div class="txt">
            <span>微信</span>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
  import Operation from '@/components/Operation'
  export default {
    data () {
      return {}
    },
    components: { Operation },
    created () {
    },
    methods: {
      openUrl (url) {
        require('electron').shell.openExternal(url)
      }
    }
  }
</script>

<style lang="scss" scoped>
.el-main {
  position: relative;
  height: 100%;
  padding: 0;

  .about-content {
    padding: 0 50px;
    box-sizing: border-box;
    font-size: 15px;
    h3 {
      margin-top: 0;
    }
  }

  .juanzeng {
    display: inline-table;
    width: 210px;
    padding: 20px;
  }

  .juanzeng img {
    width: 210px;
    height: 210px;
  }

  .juanzeng .txt {
    font-size: 18px;
    text-align: center;
  }
}
</style>
