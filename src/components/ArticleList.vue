<template>

  <el-scrollbar ref="scrollbar" class="el-scrollbar">
    <div class="article-list" v-if="getDisplayList.length > 0">
      <div
        class="article-list-panel"
        :class="{active: type === 'recentArticle' ? item.id === selectedPostId : index === selectIndex }"
        v-for="(item, index) in getDisplayList"
        :key="index"
        ref="post"
        @dblclick="handleDBClick(item, index)"
        @click="handleItem(item, index)">
        <div class="article-list-item">
          <i class="article-icon" :class="getListItemIcon"/>
          <span class="article-title">{{ item.title || item }}</span>
          <span class="article-date">{{ item.date ? item.date.slice(0, 11) : (new Date()).Format('yyyy-MM-dd')}}</span>
        </div>
      </div>
    </div>
    <div class="article-none-panel" v-if="getDisplayList.length === 0">
      <p>{{$t('noArticleMsg')}}</p>
      <el-button round @click="$router.push({name: 'main', query: {type: 'add'}})">新建笔记</el-button>
    </div>
  </el-scrollbar>

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        selectIndex: 0, // 当前选中下标  只对分类和标签有效
        scrollWrap: null // 滚动条容器
      }
    },
    props: {
      type: {
        type: String,
        default: 'recentArticle' // articleCategories articleTags
      },
      keyword: {
        type: String,
        default: '' //关键字
      }
    },
    mounted () {
      this.scrollWrap = this.$refs.scrollbar.$refs.wrap // 滚动条容器，详见：el-scrollbar组件源码
      this.onscroll()
      this.setScrollLocation()
    },

    methods: {
      /**
      * @func  处理单击事件
      * @param {Object} item 当前点击项
      */
      handleItem (item, index) {
        this.selectIndex = index
        if (this.type !== 'recentArticle') return
        this.$store.dispatch('Hexo/selectPost', item.id)
      },
      /**
      * @func 处理双击事件
      * @param {Object} item 当前双击项
      * @param {Number} index 当前下标
      */
      handleDBClick (item, index) {
        if (this.type === 'recentArticle') return
        this.selectIndex = index
        let query = {}
        if (this.type === 'articleCategories') {
          // query.category = item
          query.key = 'cat#' + item
        } else if (this.type === 'articleTags') {
          // query.tag = item
          query.key = 'tag#' + item
        }
        this.$router.push({
          name: 'main',
          query
        })
        // this.$store.dispatch('Hexo/selectByKey', key)
        // this.$router.push({ name: 'main' })
      },

      // 监听滚动状态，并存储滚动位置
      onscroll (e) {
        var me = this
        me.scrollWrap.addEventListener('scroll', function (e) {
          me.$store.dispatch('UiStatus/onscroll', {
            scrollTop: e.srcElement.scrollTop,
            scrollLeft: e.srcElement.scrollLeft
          })
        })
      },

      // 设置滚动位置
      setScrollLocation () {
        let scrollTop = this.$store.state.UiStatus.postListScrollTop || 0
        let scrollLeft = this.$store.state.UiStatus.postListScrollLeft || 0
        if (scrollTop > 0 || scrollLeft > 0) {
          this.scrollWrap.scrollTop = scrollTop
          this.scrollWrap.scrollLeft = scrollLeft
        }
      }
    },
    watch: {
      getDisplayList (newValue, oldValue) {
        if (newValue && newValue.length) {
          this.$store.dispatch('Hexo/selectPost', newValue[0].id)
        }
      }
    },
    computed: {
      ...mapGetters({
        tags: 'Hexo/tags',
        categories: 'Hexo/categories'
      }),
      posts () {
        return this.$store.getters['Hexo/filteredPosts']
      },
      selectedPostId () {
        let selectedPost = this.$store.getters['Hexo/selectedPost']
        return selectedPost ? selectedPost._id : null
      },
      getDisplayList () {
        let keyword = this.keyword
        if (this.type === 'recentArticle') {
          return keyword ? this.posts.filter(v => v.title.indexOf(keyword) > -1) : this.posts
        } else if (this.type === 'articleCategories') {
          return keyword ? this.categories.filter(v => v.indexOf(keyword) > -1) : this.categories
        } else if (this.type === 'articleTags') {
          return keyword ? this.tags.filter(v => v.indexOf(keyword) > -1) : this.tags
        }
      },
      getListItemIcon () {
        if (this.type === 'recentArticle') {
          return 'el-icon-menu'
        } else if (this.type === 'articleCategories') {
          return 'iconfont icon-categories'
        } else if (this.type === 'articleTags') {
          return 'iconfont icon-tags'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-scrollbar {
    width: 100%;
    border-right: 1px solid #E9E9E9;
    .article-list-panel {
      padding: 0 10px 0 25px;
      box-sizing: border-box;
      &:hover,
      &.active {
        background-color: #f2f2f2;
      }
      .article-list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        color: #727272;
        cursor: pointer;
        .article-icon {
          display: inline-block;
          margin-right: 8px;
          &.el-icon-menu {
            color: #4E7999;
          }
          &.icon-categories {
            color: #E8A653;
          }
          &.el-icon-menu {
            color: #4E7999;
          }
        }
        .article-title {
          overflow: hidden;
          flex: 1;
          width: auto;
          color: #000;
          font-weight: 400;
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          word-wrap: break-word;
          word-break: break-all;
        }
        .article-date {
          display: inline-block;
          width: 80px;
          text-align: right;
          color: #b2b2b2;
          font-size: 12px;
        }
      }
    }

    .article-none-panel {
      color: #727272;
      text-align: center;
      margin-top: 50%;
      p {
        color: #666;
        font-size: 14px;
      }
      .el-button {
        color: #5576BD;
      }
    }
  }

  // .article-edit-btn {
  //   top: 5px;
  //   right: 6px;
  //   opacity: 0;
  //   position: absolute;
  //   padding: 5px 6px;
  //   border-radius: 15px;
  //   cursor: pointer;
  //   font-size: 14px;
  //   line-height: 1;
  //   transition: opacity 0.3s ease, background-color 0.1s ease;
  //   background-color: #d5d5d5;
  // }

  // .article-delete-btn {
  //   top: 5px;
  //   right: 36px;
  //   opacity: 0;
  //   position: absolute;
  //   padding: 5px 6px;
  //   border-radius: 15px;
  //   cursor: pointer;
  //   font-size: 14px;
  //   line-height: 1;
  //   transition: opacity 0.3s ease, background-color 0.1s ease;
  //   background-color: #d5d5d5;
  // }

  // .article-edit-btn:hover, .article-delete-btn:hover {
  //   background-color: #c0c0c0;
  // }

  // .article-list-panel:hover .article-edit-btn,
  // .article-list-panel:hover .article-delete-btn {
  //   opacity: 1;
  // }

</style>

