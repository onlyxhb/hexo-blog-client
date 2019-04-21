<template>
  <div>
    <div class="article-list" v-if="getDisplayList.length > 0">
      <div
        class="article-list-panel"
        :class="{active: type === 'recentArticle' ? item.id === selectedPostId : index === selectIndex, isTop: item.top }"
        v-for="(item, index) in getDisplayList"
        :key="index"
        ref="post"
        @dblclick="handleDBClick(item, index)"
        @click="handleItem(item, index)">
        <div class="article-list-item">
          <i class="article-icon" :class="getListItemIcon"/>
          <span class="article-title">{{ item.title || item }}</span>
          <span class="article-date" v-if="type === 'recentArticle'">{{ item.date.slice(0, 11) }}</span>
          <span class="article-num" v-else>{{ getCateTagNum(item) }}</span>
        </div>
      </div>
    </div>
    <div class="article-none-panel" v-if="getDisplayList.length === 0">
      <p>{{$t('noArticleMsg')}}</p>
      <el-button round @click="handleAddArticle">新建笔记</el-button>
    </div>
  </div>

</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Utils from '@/service/Utils'
  export default {
    name: 'ArticleList',
    data () {
      return {
        selectIndex: 0 // 当前选中下标  只对分类和标签有效
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

    methods: {
      formatDate: Utils.formatDate,
      ...mapMutations({
        changeType: 'Article/changeType'
      }),
      handleAddArticle () {
        this.changeType('add')
        this.$router.push({name: 'main'})
      },
      /**
      * @func  处理单击事件
      * @param {Object} item 当前点击项
      */
      handleItem (item, index) {
        this.selectIndex = index
        if (this.type !== 'recentArticle') return
        this.changeType('preview')
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
          query.key = 'cat#' + item
        } else if (this.type === 'articleTags') {
          query.key = 'tag#' + item
        }
        this.$router.push({
          name: 'main',
          query
        })
      },
      getCateTagNum (name) {
        let key = this.type === 'articleCategories' ? 'categories' : 'tags'
        let num = 0
        this.allPost.some(post => {
          if (num) return true
          post[key].some(item => {
            if (item.name === name) {
              num = item.length
              return true
            }
          })
        })
        return num
      }
    },
    watch: {
      getDisplayList (newValue) {
        if (newValue && newValue.length) {
          this.$store.dispatch('Hexo/selectPost', newValue[0].id)
        }
      }
    },
    computed: {
      ...mapGetters({
        allPost: 'Hexo/posts',
        posts: 'Hexo/filteredPosts',
        tags: 'Hexo/tags',
        categories: 'Hexo/categories'
      }),
      selectedPostId () {
        let selectedPost = this.$store.getters['Hexo/selectedPost']
        return selectedPost ? selectedPost._id : null
      },
      getDisplayList () {
        let keyword = this.keyword
        let result = ''
        if (this.type === 'recentArticle') {
          result = keyword ? this.posts.filter(v => v.title.indexOf(keyword) > -1) : this.posts
        } else if (this.type === 'articleCategories') {
          result = keyword ? this.categories.filter(v => v.indexOf(keyword) > -1) : this.categories
        } else if (this.type === 'articleTags') {
          result = keyword ? this.tags.filter(v => v.indexOf(keyword) > -1) : this.tags
        }
        return result
      },
      getListItemIcon () {
        let result = 'el-icon-menu'
        if (this.type === 'recentArticle') {
          result = 'el-icon-menu'
        } else if (this.type === 'articleCategories') {
          result = 'iconfont icon-categories'
        } else if (this.type === 'articleTags') {
          result = 'iconfont icon-tags'
        }
        return result
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article-list-panel {
    position: relative;
    padding: 0 10px 0 25px;
    box-sizing: border-box;
    &:hover,
    &.active {
      background-color: #f2f2f2;
    }
    &.isTop::after {
      content: '';
      position: absolute;
      top: -5px;
      right: -5px;
      border: 6px solid transparent;
      border-top-color: #e8eaf4;
      transform: rotate(220deg);
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
      .article-num {
        padding: 0 8px;
        border-radius: 20px;
        background-color: #5576BD;
        color: #fff;
        opacity: .7;
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
</style>

