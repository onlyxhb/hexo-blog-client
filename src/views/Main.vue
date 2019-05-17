<template>
  <articleMain type="recentArticle" :hasParentKey="hasParentKey">
    <!-- 右侧部分自定义 -->
    <article-view
      slot="right-item"
      :post="headerPost"
      @editPost="editPost"
      @deletePost="deletePost"
      @sharePost="sharePost"
      @setPost="visible = !visible"
      @savePost="submitForm">
      <!-- 右侧主界面 -->
      <markdown-editor
        v-if="type === 'preview'"
        slot="right-item-main"
        ref="mdEditor"
        v-show="inited"
        v-model="post._content"
        :showToolbars="mdConfig.showToolbars"
        :defaultOpen="mdConfig.defaultOpen"
        :subfield="mdConfig.subfield"/>
        <markdown-editor
        v-else
        slot="right-item-main"
        v-show="inited"
        v-model="postForm.content"
        :initValue="postForm.content"
        :showToolbars="mdConfig.showToolbars"
        :defaultOpen="mdConfig.defaultOpen"
        :subfield="mdConfig.subfield"
        @change="formChanged = true"
        @save="submitForm"/>
    </article-view>
    <!-- 弹出dialog -->
    
    <div slot="dialog-area" class="article-dialog-input">
      <el-dialog
        center
        class="custom-dialog-form"
        title="文章设置"
        :show-close="false"
        :visible.sync="visible"
        :before-close="handleDialogCancel"
        width="600px">
        <el-form :model="postForm" :rules="postFormRules" label-width="100px"  ref="postForm" :show-message="false">
          <img v-if="postForm.img" :src="postForm.img" class="article-home-img"/>
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="postForm.title" placeholder="请输入文章标题" :disabled="type === 'edit'" clearable></el-input>
          </el-form-item>
          <el-form-item label="文章作者" prop="author">
            <el-input v-model="postForm.author" placeholder="请输入文章作者" clearable></el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="categories">
            <el-select v-model="postForm.categories" placeholder="请选择分类" style="width: 100%" multiple filterable allow-create default-first-option>
              <el-option
                v-for="category in categories"
                :key="category"
                :label="category"
                :value="category">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章标签" prop="tags">
            <el-select v-model="postForm.tags" placeholder="请选择标签"  style="width: 100%"  multiple filterable allow-create default-first-option>
              <el-option
                v-for="tag in tags"
                :key="tag"
                :label="tag"
                :value="tag">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首页图片">
            <el-input v-model="postForm.img" placeholder="请输入首页图片" clearable />
          </el-form-item>
          <el-form-item label="开启目录">
            <el-switch v-model="postForm.toc"></el-switch>
          </el-form-item>
          <el-form-item label="文章置顶">
            <el-switch v-model="postForm.top"></el-switch>
          </el-form-item>
          <el-form-item label="首页轮播">
            <el-switch v-model="postForm.cover"></el-switch>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="handleDialogConfirm">确定</el-button>
            <el-button @click="handleDialogCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </articleMain>
</template>

<script>
  import ArticleMain from '@/layout/Main'
  import ArticleView from '@/components/ArticleView'
  import MarkdownEditor from '@/components/Editor'
  import { mapGetters, mapMutations } from 'vuex'
  import Utils from '@/service/Utils'
  const electron = require('electron')
  export default {
    name: 'MainPage',
    components: {ArticleMain, ArticleView , MarkdownEditor},
    data () {
      return {
        visible: this.type === 'add', // 是否弹出dialog
        hasParentKey: false, // 从分类和标签页带条件过来
        inited: false,
        formLabelWidth: 100,
        formChanged: false, // 表单是否发生了变化
        postForm: {
          title: '', // 文章标题
          content: '', // 修改后文
          tags: [], // 标签
          categories: [], // 分类
          toc: false, // 开启toc
          top: false, // 置顶
          cover: false, // 首页轮播
          img:  '', // 文章首页图
          date: Utils.formatDate(new Date()), // 创建时间
          update: Utils.formatDate(new Date()), // 修改时间
          author: '' // 文章作者
        },
        postFormRules: {
          title: [{required: true, trigger: 'blur'}],
          author: [{required: true, trigger: 'blur'}],
          categories: [{required: true, trigger: 'blur'}],
          tags: [{required: true, trigger: 'blur'}],
          content: [{required: true, trigger: 'blur'}]
        },
        frontMatters: [] // 文章的font-matter
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
      if (this.type !== 'preview') {
        this.getFrontMatter()
      }
      this.renderLink()
      this.inited = true
      this.author = this.config.author
      if (this.type === 'add') {
        this.clearData()
        this.visible = true
      }
    },
    updated () {
      // 预览模式需要滚动到最上方
      if (this.type === 'preview') {
        let targetEl = this.$refs.mdEditor.$el.querySelector('.v-show-content.scroll-style')
        targetEl.scrollTo(0, 0)
      }
    },
    watch: {
      type (val) {
        if (val === 'add') {
          this.clearData()
          this.visible = true
        }  else if (val === 'edit') {
          this.getFrontMatter()
        }
      }
    },
    methods: {
      ...mapMutations({
        changeType: 'Article/changeType'
      }),
      clearData () {
        this.postForm = {
          title: '', // 文章标题
          content: '', // 修改后文
          tags: [], // 标签
          categories: [], // 分类
          toc: false, // 开启toc
          top: false, // 置顶
          cover: false, // 首页轮播
          img:  '', // 文章首页图
          date: Utils.formatDate(new Date()), // 创建时间
          update: Utils.formatDate(new Date()), // 修改时间
          author: this.config.author // 文章作者
        }
      },
      // a标签在浏览器中打开
      renderLink () {
        let markdownBody = document.querySelector('.markdown-body.custom-markdown-editor')
        markdownBody.onclick = event => {
          let target = event.target || event.srcElement
          if(target.nodeName.toLowerCase() == 'a') {
            event.preventDefault()
            event.stopPropagation()
            let href = event.target.getAttribute('href')
            if (href) {
              electron.shell.openExternal(href)
            }
          }
        }
      },
      getFrontMatter () {
        let post = this.post
        let keys = Object.keys(post)
        for (let i = 0; i < keys.length; i++) {
          switch (keys[i]) {
            case 'title':
              this.postForm.title = post.title.trim()
              break
            case '_content':
              this.postForm.content = post._content.trim()
              break
            case 'tags':
              this.postForm.tags = []
              post.tags.forEach(tag => {
                this.postForm.tags.push(tag.name)
              })
              break
            case 'categories':
              this.postForm.categories = []
              post.categories.forEach(cat => {
                this.postForm.categories.push(cat.name)
              })
              break
            case 'date':
              this.postForm.date = post.date.format('YYYY-MM-DD HH:mm:ss')
              break
            case 'update':
              this.postForm.update = post.update
              break
            case 'toc':
              this.postForm.toc = post.toc
              break
            case 'top':
              this.postForm.top = post.top
              break
            case 'cover':
              this.postForm.cover = post.cover
              break
            case 'img':
              this.postForm.img = post.img
              break
            default:
              break
          }
        }
        // frontMatter
        let frontMatter = Utils.frontMatter(post.raw)
        Object.keys(frontMatter).forEach(key => {
          this.frontMatters.push({
            title: key,
            value: frontMatter[key]
          })
        })
      },
      editPost (type) {
        this.changeType(type)
      },
      deletePost () {
        let id = this.post._id
        this.$confirm(this.$t('deleteArticleConfirmMsg'), '提示').then(async () => {
          await this.$store.dispatch('Hexo/deletePost', id)
          this.$message(this.$t('deleteSuccessMsg'))
        })
      },
      sharePost () {
        electron.shell.openExternal(this.post.permalink)
      },
      handleDialogConfirm () {
        this.$refs.postForm.validate(err => {
          if (!err) return false
          this.visible = false
          this.formChanged = true
        })
      },
      handleDialogCancel () {
        this.visible = false
      },

      /**
      * @func 保存弹框的表单信息
      */
      async submitForm () {
        let action = 'Hexo/createPost'
        let text = '保存'
        if (this.type === 'edit') {
          action = 'Hexo/editPost'
          text = '修改'
        }
        let valid = this.$refs.postForm ? await this.$store.dispatch('Hexo/validatePostForm', this.$refs.postForm) : true
        if (!valid || !this.postForm.title) {
          this.visible = true
          return
        }
        try {
          let submitForm = Object.assign({}, this.postForm)
          if (this.type === 'edit') {
            submitForm.update = Utils.formatDate(new Date()) // 修改时间
          }
          await this.$store.dispatch(action, submitForm)
          this.formChanged = false
          this.$message(`${text}成功`)
        } catch (err) {
          this.$message.error(`${text}失败`)
        }
      },
    },
    computed: {
      ...mapGetters({
        config: 'Hexo/config',
        tags: 'Hexo/tags',
        type: 'Article/type',
        categories: 'Hexo/categories'
      }),
      post () {
        return this.$store.getters['Hexo/selectedPost']
      },
      mdConfig () {
        if (this.type === 'preview') {
          return { showToolbars: false, defaultOpen: 'preview', subfield: false}
        } else {
          return { showToolbars: true, defaultOpen: '', subfield: true}
        }
      },
      headerPost () {
        return this.type === 'preview' ? this.post : this.postForm
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
