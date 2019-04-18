<template>
  <el-main v-if="post" style="padding-top: 0px;">
    <transition name="el-fade-in-linear">
      <article class="article" v-show="inited">
        <header class="article-header" :class="{ 'hasArticle': type==='recentArticle' }">
          <div class="window-operation"><slot name="opera"/></div>
          <div class="artile-title-box"><label class="article-title" v-show="type==='recentArticle'">{{ post.title }}</label></div>
          <div class="article-sub" v-show="type==='recentArticle'">
            <div>
              <label class="article-time">{{ post.date.format('YYYY-MM-DD HH:mm:ss') }}</label>
              <label class="article-cat" v-for="(category, index) in post.categories.data" :key="index + category.name">
                <el-tag size="small">{{ category.name }}</el-tag>
              </label>
              <label class="article-tag" v-for="(tag, index) in post.tags.data" :key="index + tag.name">
                <el-tag type="info" size="small">{{ tag.name }}</el-tag>
              </label>
            </div>
            <label class="article-opa" @click="handleArticle">
              <i class="el-icon-edit click-back" name="edit"/>
              <i class="el-icon-delete click-back" name="delete"/>
              <i class="el-icon-share click-back" name="share"/>
              <i class="el-icon-more click-back" name="more"/>
            </label>
          </div>
        </header>
        <div class="markdown-body" v-if="type==='recentArticle'" v-html="post.content"/>
        <div v-else class="article-no-data">
          <i class="iconfont" :class="type === 'articleTags' ? 'icon-tags' : 'icon-categories'"/>
          <p>无内容</p>
        </div>
      </article>
    </transition>
  </el-main>
</template>

<script>
  const electron = require('electron')
  const fs = require('fs')

  export default {
    data () {
      return {
        inited: false
      }
    },
    props: {
      type: {
        type: String,
        default: 'recentArticle' // articleCategories articleTags
      }
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
      handleArticle (event) {
        let name = event.target.getAttribute('name')
        switch(name) {
          case 'edit' : {
            this.editPost()
            break
          }
          case 'delete' : {
            this.deletePost()
            break
          }
          case 'share' : {
            this.sharePost()
            break
          }
        }
      },
      editPost () {
        let id = this.post._id
        this.$router.push({name: 'edit', params: {postId: id}})
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
      }
    }
  }
</script>

<style lang="scss" scoped>
.el-main {
  overflow: hidden;
  padding: 0;
  .article {
    position: relative;
    height: 100%;
    .article-header {
      position: relative;
      height: 75px;
      padding: 10px 0 0 20px;
      box-sizing: border-box;
      -webkit-app-region: drag;
      &.hasArticle::after {
        content: '';
        position: absolute;
        right: -20px;
        bottom: 0;
        left: -20px;
        border-bottom: 1px solid #ebeef5;
      }
      .window-operation {
        position: absolute;
        top: 0;
        right: 0;
        width: 120px;
      }
      .artile-title-box {
        display: flex;
        &::after {
          content: '';
          display: block;
          width: 130px;
        }
        .article-title {
          // flex: 1;
          color: #000;
          font-size: 19px;
          line-height: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          -webkit-app-region: no-drag;
        }
      }
      .article-sub {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .article-tag,
      .article-cat,
      .article-time {
        margin: 0px 5px;
        font-size: 12px;
        line-height: 1.5;
        color: #999;
        -webkit-app-region: no-drag;
      }
      .article-opa {
        z-index: 100;
        position: relative;
        margin-right: 5px;
        font-size: 20px;
        cursor: pointer;
        -webkit-app-region: no-drag;
        i {
          display: inline-block;
          width: 30px;
          height: 30px;
          margin-left: 10px;
          line-height: 30px;
          text-align: center;
        }
      }
    }
    .markdown-body {
      overflow-x: hidden;
      overflow-y: auto;
      position: absolute;
      top: 75px;
      bottom: 0;
      width: 100%;
      margin: 0 auto;
      padding: 20px;
      box-sizing: border-box;
      line-height: 21px;
      font-size: 14px;
      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        height: 10px;
        background-color: transparent;
      }
      &:hover::-webkit-scrollbar-thumb {
        background-color: #c1c1c1
      }
    }

    // 没数据
    .article-no-data {
      height: 100%;
      padding-top: 35%;
      box-sizing: border-box;
      text-align: center;
      i {
        color: #E7A44E;
        font-size: 60px;
      }
      p {
        color: #C1CCD6;
      }
    }
  }
}
</style>


