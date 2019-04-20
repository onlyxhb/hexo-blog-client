<template>
  <articleMain type="recentArticle" :hasParentKey="hasParentKey">
    <!-- 右侧部分自定义 -->
    <article-view
      slot="right-item"
      :post="headerPost"
      @editPost="editPost"
      @deletePost="deletePost"
      @sharePost="sharePost"
      @setPost="setPost"
      @savePost="submitForm">
      <!-- 右侧主界面 -->
      <markdown-editor
        v-if="type === 'preview'"
        slot="right-item-main"
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
        @change="formChanged = true"/>
    </article-view>
    <!-- 弹出dialog -->
    
    <div slot="dialog-area" class="article-dialog-input">
      <el-dialog
        center
        class="custom-dialog-form"
        title="文章设置"
        :show-close="false"
        :visible.sync="visible"
        width="500px">
        <el-form :model="postForm" :rules="postFormRules" label-width="80px"  ref="postForm">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="postForm.title" placeholder="请输入文章标题" :disabled="type === 'edit'"></el-input>
          </el-form-item>
          <el-form-item label="文章路径">
            <el-input v-model="postForm.path" placeholder="请输入文章路径" :disabled="type === 'edit'"></el-input>
          </el-form-item>
          <el-form-item label="文章作者" prop="author">
            <el-input v-model="postForm.author" placeholder="请输入文章作者"></el-input>
          </el-form-item>
          <el-form-item label="分类标签">
            <el-col :span="11">
              <el-select v-model="postForm.categories" placeholder="请选择分类" multiple filterable allow-create default-first-option>
                <el-option
                  v-for="category in categories"
                  :key="category"
                  :label="category"
                  :value="category">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2" class="line"/>
            <el-col :span="11">
              <el-select v-model="postForm.tags" placeholder="请选择标签" multiple filterable allow-create default-first-option>
                <el-option
                  v-for="tag in tags"
                  :key="tag"
                  :label="tag"
                  :value="tag">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="文章时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="创建时间" v-model="postForm.createTime" style="width: 100%;"/>
            </el-col>
            <el-col :span="2" class="line"/>
            <el-col :span="11">
              <el-date-picker placeholder="修改时间" v-model="postForm.date" style="width: 100%;"/>
            </el-col>
          </el-form-item>
          <el-form-item label="开启目录">
            <el-switch v-model="postForm.toc"></el-switch>
          </el-form-item>
          <el-form-item label="首页图片">
            <el-col :span="14">
              <el-input type="textarea" v-model="postForm.img" rows="3" resize="none"></el-input>
            </el-col>
            <el-col :span="10">
              <img v-if="postForm.img" :src="postForm.img" class="article-home-img"/>
            </el-col>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="visible = false, formChanged = true">确定</el-button>
            <el-button @click="visible = false">取消</el-button>
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
  export default {
    name: 'main-page',
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
          path: '', // 文章路径
          originContent: '', // 原文
          content: '', // 修改后文
          tags: [], // 标签
          categories: [], // 分类
          toc: false, // 开启toc
          img:  '', // 文章首页图
          createTime: '', // 创建时间
          date: '', // 修改时间
          author: '徐辉波' // 文章作者
        },
        postFormRules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '请输入作者', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 13 到 20 个字符', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ]
        }
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
      ...mapMutations({
        changeType: 'Article/changeType'
      }),
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
      getFrontMatter () {
        let me = this
        let post = this.post
        let keys = Object.keys(post)
        for (let i = 0; i < keys.length; i++) {
          switch (keys[i]) {
            case 'title':
              me.postForm.title = post.title.trim()
              break
            case 'path': {
              let source = post.source.trim()
              if (source) {
                let start = source.indexOf('/')
                let end = source.lastIndexOf('.md')
                if (start !== -1 && end !== -1 && start !== end) {
                  me.postForm.path = source.substring(start + 1, end)
                }
              }
              break
            }
            case '_content':
              me.postForm.content = post._content.trim()
              break
            case 'tags':
              me.postForm.tags = []
              post.tags.forEach(tag => {
                me.postForm.tags.push(tag.name)
              })
              break
            case 'categories':
              me.postForm.categories = []
              post.categories.forEach(cat => {
                me.postForm.categories.push(cat.name)
              })
              break
            case 'date':
              me.postForm.date = post.date.format('YYYY-MM-DD HH:mm:ss')
              break
            case 'toc':
              me.postForm.toc = post.toc
              break
            default:
              break
          }
        }

        // frontMatter
        let frontMatter = Utils.frontMatter(post.raw)
        Object.keys(frontMatter).forEach(key => {
          me.postForm[key] = frontMatter[key]
        })
      },
      editPost (type) {
        this.changeType(type)
        // 只有在修改的时候需要获取所有的front-matter
        if (type === 'edit') {
          this.getFrontMatter()
        } else if (type === 'edit') {
          this.visible = true
        }
      },
      deletePost () {
        let id = this.post._id
        this.$confirm(this.$t('deleteArticleConfirmMsg'), '提示').then(async () => {
          await this.$store.dispatch('Hexo/deletePost', id)
          this.$notify({title: this.$t('successTitle'), message: this.$t('deleteSuccessMsg'), type: 'success'})
        })
      },
      sharePost () {
        require('electron').shell.openExternal(this.post.permalink)
      },
      setPost () {
        this.visible = !this.visible
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
        let valid = await this.$store.dispatch('Hexo/validatePostForm', this.$refs.postForm)
        if (valid) {
          try {
            await this.$store.dispatch(action, this.postForm)
            this.formChanged = false
            this.postForm.originContent = this.postForm.content
            this.$notify({title: '成功', message: `${text}成功`, type: 'success'})
          } catch (err) {
            this.$notify.error({title: '错误', message: `${text}失败`})
          }
        } else {
          this.$notify.error({title: '错误', message: '表单验证失败'})
        }
      },
    },
    computed: {
      ...mapGetters({
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
