<template>
  <el-container style="height: 100%; position: relative">
    <!-- 左侧部分 -->
    <div class="main-left-container" :class="{collapsed: collapse}">
      <el-form class="main-left-search">
        <el-form-item style="margin-bottom: 0;">
          <i class="el-icon-back" :class="{ disabled: !getBackStatus }" :title="$t('goBack')" @click="handleBack"/>
          <el-input clearable :placeholder="$t('search')" v-model="keyword" clearable />
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
    components: {ArticleList},
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
        collapse: 'Article/collapse'
      }),
      getBackStatus () {
        return this.type === 'recentArticle' && this.hasParentKey
      }
    },
    methods: {
      handleDropdown (command) {
        this.filterType = command
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
          font-size: 18px;
          opacity: .7;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
        .el-icon-caret-bottom {
          font-size: 8px !important;
          vertical-align: top;
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
