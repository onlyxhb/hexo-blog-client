<template>
  <div>
    <img :src="getPhoto" draggable="false" :title="$t('imgTitle')" class="icon" @click="$router.push('settings')"/>
    <ul class="custom-opeartor">
      <li :title="$t('deploy')"><deploy/></li>
      <li :title="$t('download')"><deploy type="download"/></li>
      <li :title="$t('refresh')" @click="reload"><i class="el-icon-refresh"></i></li>
    </ul>
    <p class="add-article" :title="$t('new')" @click="handleAddArticle"><i class="el-icon-plus"></i></p>
    <el-menu
      :collapse="true"
      @select="dispatch"
      :default-active="$route.path.split('/')[1]"
      background-color="#5576BD"
      text-color="#fff"
      active-text-color="#fff">
      <el-menu-item index="main" :title="$t('recentArticle')">
        <i class="el-icon-menu"></i>
      </el-menu-item>
      <el-menu-item index="cates" :title="$t('articleCategories')">
        <i class="iconfont icon-categories"></i>
      </el-menu-item>
      <el-menu-item index="tags" :title="$t('articleTags')">
        <i class="iconfont icon-tags"></i>
      </el-menu-item>
      <el-menu-item index="about" :title="$t('menuAbout')">
        <i class="el-icon-info"></i>
      </el-menu-item>
      <el-menu-item index="settings" :title="$t('menuSettings')">
        <i class="el-icon-setting"></i>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  const { ipcRenderer } = require('electron')
  import Deploy from '@/components/Deploy'
  import photoPic from '@/mixins/photoPic'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {}
    },
    components: {Deploy},
    mixins: [photoPic],
    methods: {
      ...mapMutations({
        changeType: 'Article/changeType',
        setCollapse: 'Article/setCollapse'
      }),
      handle: ipcRenderer.send,
      dispatch (index) {
        switch (index) {
          case 'main':
          case 'cates':
          case 'tags':
          case 'settings':
          case 'about':
            this.changeType('preview')
            this.setCollapse(false)
            this.$router.push({name: index})
            break
          default:
        }
      },
      handleAddArticle () {
        this.changeType('add')
        this.$router.push({name: 'main'})
      },
      reload () {
        window.location.reload()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon {
    width: 50px;
    height: 50px;
    margin: 30px auto 0;
    padding: 3px;
    border: 1px solid #6582C2;
    border-radius: 50%;
    opacity: .8;
    -webkit-app-region: no-drag;
    &:hover {
      opacity: 1;
    }
  }
  .custom-opeartor {
    margin-top: 10px;
    padding: 0;
    text-align: center;
    list-style: none;
    -webkit-app-region: no-drag;
    li {
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 15px;
      opacity: .6;
      &:hover {
        opacity: 1;
      }
    }
  }
  .add-article {
    width: 50px;
    height: 50px;
    margin: 15px auto 25px;
    line-height: 54px;
    text-align: center;
    border-radius: 50%;
    background-color: #94A9D5;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    -webkit-app-region: no-drag;
    &:hover {
      background-color: #fff;
      color: #5576BD;
    }
  }
  /deep/ .el-menu--collapse {
    width: 80px !important;
    .el-menu-item {
      height: 40px;
      border-left: 5px solid transparent;
      line-height: 40px;
      -webkit-app-region: no-drag;
      [class^='iconfont icon-'],
      [class^='el-icon-'] {
        color: #fff;
        font-size: 15px;
      }
      &.is-active {
        border-left-color: #7ebbed;
        background-color: #435d99 !important;
      }
      &:hover {
        border-left-color: #7ebbed;
        background-color: #4e6bb1 !important;
      }
    }
  }
</style>
