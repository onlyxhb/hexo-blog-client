<template>
  <articleMain type="recentArticle" :hasParentKey="hasParentKey">
    <!-- 右侧部分自定义 -->
    <article-view
      slot="right-item"
      :post="headerPost"
      @editPost="editPost"
      @deletePost="deletePost"
      @sharePost="sharePost"
      @localviewPost="localviewPost"
      @setPost="visible = !visible"
      @savePost="submitForm"
      @setMore="frontMattersVisible = !frontMattersVisible">
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
      <!-- 基本设置弹框 -->
      <el-dialog
        center
        class="custom-dialog-form"
        :title="$t('postForm.dialog.title')"
        :show-close="false"
        :visible.sync="visible"
        :before-close="handleDialogCancel"
        width="600px">
        <el-form :model="postForm" :rules="postFormRules" label-width="100px"  ref="postForm" :show-message="false">
          <img v-if="postForm.img" :src="postForm.img" class="article-home-img"/>
          <el-form-item :label="$t('postForm.title.label')" prop="title">
            <el-input v-model="postForm.title" :placeholder="$t('postForm.title.placeholder')" :disabled="type === 'edit'" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('postForm.path.label')" prop="path">
            <el-input v-model="postForm.path" :placeholder="$t('postForm.path.placeholder')" :disabled="type === 'edit'" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('postForm.author.label')" prop="author">
            <el-input v-model="postForm.author" :placeholder="$t('postForm.author.placeholder')" clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('postForm.categories.label')" prop="categories">
            <el-select v-model="postForm.categories" :placeholder="$t('postForm.categories.placeholder')" style="width: 100%;" multiple filterable allow-create default-first-option>
              <el-option
                v-for="category in categories"
                :key="category"
                :label="category"
                :value="category">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('postForm.tags.label')" prop="tags">
            <el-select v-model="postForm.tags" :placeholder="$t('postForm.tags.placeholder')"  style="width: 100%;"  multiple filterable allow-create default-first-option>
              <el-option
                v-for="tag in tags"
                :key="tag"
                :label="tag"
                :value="tag">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('postForm.img.label')">
            <el-input v-model="postForm.img" :placeholder="$t('postForm.img.placeholder')" clearable />
          </el-form-item>
          <el-form :inline="true">
            <el-form-item  :label="$t('postForm.toc.label')">
              <el-switch v-model="postForm.toc" style="margin-right: 30px;"/>
            </el-form-item>
            <el-form-item :label="$t('drafts')">
              <!-- 是否保存为草稿，如果切换成草稿之后，那么就不让切回去了, 否则来回切换会有问题 -->
              <el-tooltip class="item" effect="dark" content="发布后的内容无法再切换为草稿" placement="top">
                <el-switch
                  v-model="postForm.layout"
                  active-value="draft"
                  inactive-value="post"
                  :disabled="isLockSwitchDraft"/>
              </el-tooltip>
            </el-form-item>
          </el-form>
          <el-form-item style="text-align: left;">
            <el-button type="primary" @click="handleDialogConfirm">{{$t('confirmButtonText')}}</el-button>
            <el-button @click="handleDialogCancel">{{$t('cancelButtonText')}}</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- frontMatters弹框 -->
      <el-dialog
        center
        class="custom-dialog-frontmater"
        :title="$t('postForm.frontmatters.title')"
        :visible.sync="frontMattersVisible"
        width="600px">
        <el-table
          class="table-front-matters"
          :empty-text="$t('postForm.frontmatters.noData')"
          highlight-current-row
          :data="frontMatters"
          border
          stripe>
          <el-table-column prop="title" :label="$t('postForm.frontmatters.key')" width="100">
            <template scope="scope">
              <el-input size="small" v-model="scope.row.title" @blur="valideFrontTitle(scope)"></el-input>
              <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="value" :label="$t('postForm.frontmatters.value')">
            <template scope="scope">
              <el-input size="small" v-model="scope.row.value"></el-input>
              <span>{{scope.row.value}}</span>
            </template>
          </el-table-column>
          <el-table-column width="80" align="center">
            <template slot="header">
              <el-button size="mini" type="primary" @click="frontMatters = [...frontMatters, {}]">{{$t('postForm.frontmatters.add')}}</el-button>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteFrontMatter(scope)">{{$t('postForm.frontmatters.del')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
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
import ClientAnalytics from '@/plugins/analytics'
const electron = require('electron')
export default {
  name: 'MainPage',
  components: { ArticleMain, ArticleView, MarkdownEditor },
  data () {
    return {
      visible: this.type === 'add', // 是否弹出dialog
      hasParentKey: false, // 从分类和标签页带条件过来
      inited: false,
      formLabelWidth: 100,
      formChanged: false, // 表单是否发生了变化
      draft: false, // 是否是草稿
      postForm: {
        title: '', // 文章标题
        path: '', // 文章路径
        content: '', // 修改后文
        tags: [], // 标签
        categories: [], // 分类
        toc: false, // 开启toc
        img: '', // 文章首页图
        date: new Date(), // 创建时间
        updated: new Date(), // 修改时间
        author: '', // 文章作者
        layout: 'post' // 默认发表文章，还可取值draft表示发表草稿
      },
      postFormRules: {
        title: [{ required: true, trigger: 'blur' }],
        author: [{ required: true, trigger: 'blur' }],
        categories: [{ required: true, trigger: 'blur' }],
        tags: [{ required: true, trigger: 'blur' }],
        content: [{ required: true, trigger: 'blur' }]
      },
      frontMatters: [], // 文章的font-matter
      frontMattersVisible: false
    }
  },
  beforeRouteEnter (to, from, next) {
    let key = to.query.key
    next(vm => {
      if (key) vm.hasParentKey = true
      vm.$store.dispatch('Hexo/selectByKey', to.query.key)
    })
  },
  beforeRouteUpdate (to, from, next) {
    let key = to.query.key
    if (key) this.hasParentKey = true
    this.$store.dispatch('Hexo/selectByKey', to.query.key)
    this.initData()
    next()
  },
  mounted () {
    this.initData()
  },
  updated () {
    // 预览模式需要滚动到最上方
    if (this.type === 'preview' && this.$refs && this.$refs.mdEditor) {
      let targetEl = this.$refs.mdEditor.$el.querySelector('.v-show-content.scroll-style')
      targetEl.scrollTo(0, 0)
    }
  },
  watch: {
    type (val) {
      if (val === 'add') {
        this.clearData()
        this.visible = true
      } else if (val === 'edit') {
        this.getFrontMatter()
      }
    }
  },
  methods: {
    ...mapMutations({
      changeType: 'Article/changeType',
      setCollapse: 'Article/setCollapse'
    }),
    initData () {
      if (this.type !== 'preview') {
        this.getFrontMatter()
      }
      this.renderLink()
      this.inited = true
      if (this.type === 'add') {
        this.clearData()
        this.visible = true
      }
    },
    clearData () {
      this.postForm = {
        title: '', // 文章标题
        content: '', // 修改后文
        tags: [], // 标签
        categories: [], // 分类
        toc: false, // 开启toc
        top: false, // 置顶
        cover: false, // 首页轮播
        img: '', // 文章首页图
        date: new Date(), // 创建时间
        updated: new Date(), // 修改时间
        author: '', // 文章作者
        layout: 'post' // 默认发表文章，还可取值draft表示发表草稿
      }
    },
    // a标签在浏览器中打开
    renderLink () {
      let markdownBody = document.querySelector('.markdown-body.custom-markdown-editor')
      markdownBody.onclick = event => {
        let target = event.target || event.srcElement
        if (target.nodeName.toLowerCase() === 'a') {
          event.preventDefault()
          event.stopPropagation()
          let href = event.target.getAttribute('href')
          let inner = event.target.innerHTML
          if (href || inner) {
            electron.shell.openExternal(href || inner)
          }
        }
      }
    },
    getFrontMatter () {
      let post = this.post
      let postForm = {
        title: post.title, // 文章标题
        content: post._content, // 修改后文
        tags: [], // 标签
        categories: [], // 分类
        toc: post.toc, // 开启toc
        img: post.img, // 文章首页图
        date: post.date, // 创建时间
        updated: post.updated, // 修改时间
        author: post.author, // 文章作者
        path: post.path
      }
      if (!post.published) {
        postForm.layout = 'draft'
        this.draft = true
      } else {
        postForm.layout = 'post'
        this.draft = false
      }
      this.postForm = postForm
      post.categories.forEach(cat => {
        this.postForm.categories.push(cat.name)
      })
      post.tags.forEach(tag => {
        this.postForm.tags.push(tag.name)
      })
      // frontMatter
      this.frontMatters = []
      let frontMatter = Utils.frontMatter(post.raw)
      Object.keys(frontMatter).forEach(key => {
        this.frontMatters.push({
          title: key,
          value: frontMatter[key] + ''
        })
      })
    },
    editPost (type) {
      this.changeType(type)
    },
    deletePost () {
      let id = this.post._id
      this.$confirm(this.$t('deleteArticleConfirmMsg'), this.$t('confirmTips'), {
        confirmButtonText: this.$t('confirmButtonText'),
        cancelButtonText: this.$t('cancelButtonText')
      }).then(async () => {
        await this.$store.dispatch('Hexo/deletePost', id)
        this.$message(this.$t('deleteSuccessMsg'))
      })
    },
    sharePost () {
      electron.shell.openExternal(this.post.permalink)
    },
    localviewPost () {
      electron.shell.openExternal(`http://localhost:4000/${this.post.canonical_path}`)
    },
    handleDialogConfirm () {
      this.setCollapse(true)
      this.$refs.postForm.validate(err => {
        if (err) {
          this.visible = false
          this.formChanged = true
        }
      })
    },
    handleDialogCancel () {
      this.visible = false
      if (this.type === 'add') {
        this.changeType('preview')
      }
    },

    /**
      * @func 保存的表单信息
      */
    async submitForm () {
      let action = 'Hexo/createPost'
      let text = 'submit.save'
      if (this.type === 'edit') {
        action = 'Hexo/editPost'
        text = 'submit.edit'
      }
      let valid = this.$refs.postForm ? await this.$store.dispatch('Hexo/validatePostForm', this.$refs.postForm) : true
      if (!valid || !this.postForm.title) {
        this.visible = true
        return
      }
      try {
        if (this.frontMatters && this.frontMatters.length > 0) {
          for (let i = 0; i < this.frontMatters.length; i++) {
            let item = this.frontMatters[i]
            this.postForm[item.title] = item.value
          }
        }
        let submitForm = Object.assign({}, this.postForm)
        if (this.type === 'edit') {
          ClientAnalytics.event('article', 'editSubmit')
          submitForm.updated = new Date()// 修改时间
        } else {
          ClientAnalytics.event('article', 'createSubmit')
        }
        await this.$store.dispatch(action, submitForm)
        // 修改状态下，原本是草稿，现在标记为发布状态，那么本次操作是执行发布操作
        let doPublish = this.type === 'edit' && this.draft && submitForm.layout === 'post'
        if (doPublish) {
          await this.$store.dispatch('Hexo/publishPost', submitForm)
          this.$store.commit('Hexo/setSelectedDrafts', false)
        }
        this.formChanged = false
        setTimeout(() => {
          // 选中当前
          let filterCurrent = this.allPost.filter(v => v.title === submitForm.title)[0]
          if (filterCurrent) {
            this.$store.dispatch('Hexo/selectPost', filterCurrent.id)
            this.getFrontMatter()
            this.changeType('edit')
          }
          this.$message(this.$t(`${text}.success`))
        }, 500)
      } catch (err) {
        this.$message.error(this.$t(`${text}.fail`))
      }
    },
    valideFrontTitle ({ row }) {
      let filters = this.frontMatters.filter(v => v.title === row.title)
      if (filters && filters.length > 1) {
        this.$message.error(`${row.title}` + this.$t('haveUsing'))
      }
    },
    deleteFrontMatter ({ $index }) {
      this.frontMatters.splice($index, 1)
    }
  },
  computed: {
    ...mapGetters({
      allPost: 'Hexo/posts',
      tags: 'Hexo/tags',
      type: 'Article/type',
      categories: 'Hexo/categories'
    }),
    // 是否锁定切换草稿
    isLockSwitchDraft () {
      // 当前文章不是草稿时，编辑时不能切换为草稿状态
      return !this.draft && this.type === 'edit'
    },
    post () {
      return this.$store.getters['Hexo/selectedPost']
    },
    mdConfig () {
      if (this.type === 'preview') {
        return { showToolbars: false, defaultOpen: 'preview', subfield: false }
      } else {
        return { showToolbars: true, defaultOpen: '', subfield: true }
      }
    },
    headerPost () {
      return this.type === 'preview' ? this.post : this.postForm
    }
  }
}
</script>
