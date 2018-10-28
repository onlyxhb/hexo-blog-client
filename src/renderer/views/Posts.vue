<template>
  <el-container>
    <el-aside class="aside-article-list" style="width: 270px;" id="articleListContainer" @scroll.native="scroll">
      <article-list></article-list>
    </el-aside>

    <el-main style="padding-top: 0px;" class="article-detail-box">
      <article-view></article-view>
    </el-main>
  </el-container>
</template>

<script>
  import ArticleList from '@/components/ArticleList'
  import ArticleView from '@/components/ArticleView'

  export default {
    name: 'main-page',
    components: {ArticleList, ArticleView},
    data () {
      return {}
    },
    mounted () {
      this.setscroll()
    },
    methods: {
      // 存储滚动位置
      scroll (e) {
        this.$store.dispatch('UiStatus/onscroll', {
          scrollTop: e.srcElement.scrollTop,
          scrollLeft: e.srcElement.scrollLeft
        })
      },
      // 设置滚动位置
      setscroll () {
        let ele = document.getElementById('articleListContainer')
        let scrollTop = this.$store.state.UiStatus.postListScrollTop || 0
        let scrollLeft = this.$store.state.UiStatus.postListScrollLeft || 0
        if (scrollTop > 0 || scrollLeft > 0) {
          ele.scrollTop = scrollTop
          ele.scrollLeft = scrollLeft
        }
      }
    }
  }
</script>
<style lang="scss">
.aside-article-list,
.article-detail-box {
  &::-webkit-scrollbar {
    height: 6px;
    width: 6px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: transparent;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(69, 90, 100, .2)
  }
}
</style>

