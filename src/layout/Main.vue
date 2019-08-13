<template>
  <el-container style="position: relative; height: 100%;">
    <!-- 左侧部分 -->
    <div class="main-left-container" :class="{collapsed: collapse}">
      <el-form class="main-left-search">
        <el-form-item style="margin-bottom: 0;">
          <i class="el-icon-back" :class="{ disabled: !getBackStatus }" :title="$t('goBack')" @click="handleBack"/>
          <el-input clearable :placeholder="$t('search')" v-model="keyword" />
          <el-dropdown :hide-timeout="500" @command="handleDropdown">
            <i class="el-icon-arrow-down el-icon--right"></i>
            <el-dropdown-menu slot="dropdown" class="main-left-cate-select">
              <el-dropdown-item>请选择分类</el-dropdown-item>
              <el-dropdown-item v-for="item in categories" :command="item" :key="item">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
      </el-form>
      <div class="main-left-scrollbar main-scrollbar">
        <article-list :type="type" :keyword="keyword"/>
      </div>
    </div>
    <slot name="right-item"/>
    <slot name="dialog-area"/>
  </el-container>
</template>

<script>
import ArticleList from '@/components/ArticleList'
import { mapGetters } from 'vuex'

export default {
  components: { ArticleList },
  props: {
    type: {
      type: String,
      default: 'recentArticle' // articleCategories articleTags
    },
    hasParentKey: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      keyword: '',
      filterType: 2 // 1摘要  2 列表
    }
  },

  computed: {
    ...mapGetters({
      collapse: 'Article/collapse',
      categories: 'Hexo/categories'
    }),
    getBackStatus () {
      return this.type === 'recentArticle' && this.hasParentKey
    }
  },
  methods: {
    handleDropdown (command) {
      let key = command ? `cat#${command}` : ''
      this.$store.dispatch('Hexo/selectByKey', key)
    },
    handleBack () {
      if (this.getBackStatus) {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-menu {
  margin-top: -5px;
  padding: 0;
  .el-dropdown-menu__item {
    text-align: right;
  }
}
.main-left-container {
  position: relative;
  overflow: hidden;
  display: block;
  width: 305px;
  height: 100%;
  background-color: #fafafa;
  transition: width .3s linear;
  .main-left-search {
    overflow: hidden;
    width: 100%;
    height: 75px;
    padding: 20px 15px 15px 25px;
    box-sizing: border-box;
    -webkit-app-region: drag;
    /deep/ .el-form-item__content {
      display: flex;
      .el-icon-back {
        line-height: 40px;
        color: #333;
        font-size: 18px;
        cursor: pointer;
        -webkit-app-region: no-drag;
        &.disabled {
          color: #c8c8c8;
          cursor: not-allowed;
        }
      }
      .el-input {
        // width: 185px;
        margin: 0 15px 0 10px;
        -webkit-app-region: no-drag;
        .el-input__inner {
          border: 1px solid #e5e5e5 !important;
          border-radius: 40px;
          font-size: 12px;
        }
      }
      .el-dropdown {
        -webkit-app-region: no-drag;
        &:focus {
          outline: none;
        }
        .el-icon-sort,
        .el-icon-caret-bottom {
          line-height: 40px;
          color: #333;
          opacity: .7;
          font-size: 8px !important;
          vertical-align: top;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
  .main-left-scrollbar {
    top: 75px;
  }
  // 收起
  &.collapsed {
    width: 0;
  }
}
</style>

<style lang="scss">
.main-left-cate-select {
  margin-top: -10px;
  margin-right: -10px;
  text-align: center;
  -webkit-app-region: no-drag; 
  .el-dropdown-menu__item {
    text-align: center !important;
  }
}
</style>
