<template>
  <el-main>
    <operation/>
    <div class="about-content main-scrollbar">
      <div>
        <h3>{{$t('about.declare')}}</h3>
        <p>
          {{$t('about.declarepre')}}
          <a @click="openUrl('https://github.com/gaoyoubo/hexo-client.git')" href="#">https://github.com/gaoyoubo/hexo-client.git</a>
          {{$t('about.declaresuf')}}
        </p>
      </div>
      <div>
        <h3>{{$t('about.address')}}</h3>
        <ul>
          <li>
            Github
            <a @click="openUrl('https://github.com/Xonlystar/hexo-blog-client.git')" href="#">https://github.com/Xonlystar/hexo-blog-client.git</a>
          </li>
          <li>Blog：<a @click="openUrl('http://blog.onlystar.site')" href="#">http://blog.onlystar.site</a></li>
        </ul>
      </div>
      <div>
        <h3>{{$t('about.usinghelp')}}</h3>
        <ul>
          <li>{{$t('about.helpdocument')}}：<a @click="openUrl('https://blog.onlystar.site/2018/10/21/hexoblogclient-shi-yong-zhi-nan/')" href="#">{{$t('about.tohelpdocument')}}</a></li>
          <li>{{$t('about.submitissue')}}：<a @click="openUrl('https://github.com/Xonlystar/hexo-blog-client/issues/new')" href="#">{{$t('about.tosubmitissue')}}</a></li>
        </ul>
      </div>
      <div>
        <h3>{{$t('about.standHum')}}</h3>
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
        <h3>{{$t('donate')}}</h3>
        <div class="juanzeng">
          <img src="../assets/images/alipay.jpg">
          <div class="txt">
            <span>{{$t('about.alipay')}}</span>
          </div>
        </div>
        <div class="juanzeng">
          <img src="../assets/images/wechat.png">
          <div class="txt">
            <span>{{$t('about.wechat')}}</span>
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
    text-align: center;
    font-size: 18px;
  }
}
</style>
