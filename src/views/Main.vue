<template>
  <articleMain type="recentArticle" :hasParentKey="hasParentKey">
    <!-- 右侧部分自定义 -->
    <article-view
      slot="right-item"
      :post="post"
      :type="type"
      @editPost="editPost"
      @deletePost="deletePost"
      @sharePost="sharePost">
      <!-- 右侧主界面 -->
      <markdown-editor
        slot="right-item-main"
        v-show="inited"
        v-model="post._content"
        :showToolbars="mdConfig.showToolbars"
        :defaultOpen="mdConfig.defaultOpen"
        :subfield="mdConfig.subfield"/>
    </article-view>
    <!-- 弹出Popover -->
    <el-popover
      ref="popover"
      placement="right"
      title="标题"
      width="200"
      trigger="focus"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    </el-popover>
  </articleMain>
</template>

<script>
  import ArticleMain from '@/layout/Main'
  import ArticleView from '@/components/ArticleView'
  import MarkdownEditor from '@/components/Editor'
  export default {
    name: 'main-page',
    components: {ArticleMain, ArticleView , MarkdownEditor},
    data () {
      return {
        type: 'preview', // add edit
        hasParentKey: false, // 从分类和标签页带条件过来
        inited: false
      }
    },
    beforeRouteEnter (to, from, next) {
      let key = to.query.key
      next(vm => {
        if (key) vm.hasParentKey = true
        vm.$store.dispatch('Hexo/selectByKey', to.query.key)
      })
    },
    mounted () {
      this.renderArticle()
    },
    updated () {
      this.renderArticle()
    },
    methods: {
      renderArticle () {
        this.renderImage()
        this.renderLink()
        this.inited = true
      },
      // 渲染图片
      renderImage () {
        let contentDom = document.getElementsByClassName('markdown-body')
        if (contentDom && contentDom.length > 0) {
          let sysConfig = this.$store.state.Config.config
          let images = contentDom[0].getElementsByTagName('img')
          for (let i = 0; i < images.length; i++) {
            let img = images[i]
            let src = img.getAttribute('src')
            if (this.startWith(src, '/images')) {
              try {
                let path = sysConfig.path + '/source' + src
                let data = fs.readFileSync(path)
                let base64 = data.toString('base64')
                img.setAttribute('src', 'data:image/jpg;base64,' + base64)
              } catch (e) {
                console.error(e)
              }
              // fs.readFile(path, function (err, data) {
              //   if (!err) {
              //     let base64 = data.toString('base64')
              //     img.setAttribute('src', 'data:image/jpg;base64,' + base64)
              //   }
              // })
            }
          }
        }
      },
      // 渲染a标签
      renderLink () {
        let articleDom = document.getElementsByClassName('article')
        if (articleDom && articleDom.length > 0) {
          let links = articleDom[0].getElementsByTagName('a')
          for (let i = 0; i < links.length; i++) {
            links[i].onclick = function (event) {
              let href = event.target.getAttribute('href')
              if (href) {
                electron.shell.openExternal(href)
              }
              return false
            }
          }
        }
      },
      startWith (str, prefix) {
        return str && prefix && str.indexOf(prefix) === 0
      },
      editPost (type) {
        // let id = this.post._id
        // this.$router.push({name: 'edit', params: {postId: id}})
        this.type = type
      },
      deletePost () {
        let id = this.post._id
        this.$confirm(this.$t('deleteArticleConfirmMsg'), '提示').then(async () => {
          await this.$store.dispatch('Hexo/deletePost', id)
          this.$notify({title: this.$t('successTitle'), message: this.$t('deleteSuccessMsg'), type: 'success'})
        })
      },
      sharePost () {
        let canonical_path= this.post.canonical_path
        require('electron').shell.openExternal(`https://blog.onlystar.site/${canonical_path}`)
      }
    },
    computed: {
      post () {
        return this.$store.getters['Hexo/selectedPost']
      },
      mdConfig () {
        if (this.type === 'preview') {
          return { showToolbars: false, defaultOpen: 'preview', subfield: false}
        } else {
          return { showToolbars: true, defaultOpen: '', subfield: true}
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
