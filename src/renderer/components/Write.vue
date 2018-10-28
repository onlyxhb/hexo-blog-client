<template>
  <el-main class="write-article">

    <el-form :model="postForm" :rules="postFormRules" ref="postForm" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="postForm.title" placeholder="请输入标题" @input="formChanged = true"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content" v-loading="uploading" :element-loading-text="uploadingText">
        <mavon-editor ref="editor" v-model="postForm.content" :toolbars="toolbars" :ishljs="true"
                      codeStyle="atom-one-dark"
                      @imgsAdd="imgsAdd" @fullScreen="fullScreen" @save="submitForm"
                      :style="{height: contentHeight}" :boxShadow="false"/>
      </el-form-item>

      <div class="form-item-inline">
        <el-form-item label="分类" prop="categories">
          <el-select v-model="postForm.categories" multiple filterable allow-create default-first-option
                      style="width:100%;" placeholder="请选择分类" @input="formChanged = true">
            <el-option v-for="category in categories"
                        :key="category"
                        :label="category"
                        :value="category">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select v-model="postForm.tags" multiple filterable allow-create default-first-option
                      style="width:100%;" placeholder="请选择标签" @input="formChanged = true">
            <el-option v-for="tag in tags"
                        :key="tag"
                        :label="tag"
                        :value="tag">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐">
          <el-switch v-model="postForm.top"></el-switch>
        </el-form-item>
        <el-form-item label="文章目录">
          <el-switch v-model="postForm.toc" @input="formChanged = true"></el-switch>
        </el-form-item>
      </div>

      <el-form-item label="封面图片" prop="img">
        <el-input v-model="postForm.img" placeholder="请输入图片地址" @input="formChanged = true"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">保存</el-button>
        <!-- <el-button type="warning" @click="saveToDraft()">保存为草稿</el-button> -->
        <el-button type="danger" @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>

  </el-main>
</template>
<script>
import Write from '@/mixins/writeArticle'
export default {
  mixins: [Write],
  methods: {
    async init () {
      let postId = this.$route.params.postId
      let post = await this.$store.dispatch('Hexo/getPost', postId)

      let me = this
      let keys = Object.keys(post)
      for (let i = 0; i < keys.length; i++) {
        switch (keys[i]) {
          case 'title':
            me.postForm.title = post.title.trim()
            break
          case '_content':
            me.postForm.originContent = post._content.trim()
            me.postForm.content = post._content.trim()
            break
          case 'tags':
            post.tags.forEach(tag => {
              me.postForm.tags.push(tag.name)
            })
            break
          case 'categories':
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
          case 'img':
            me.postForm.img = post.img
            break
          case 'top':
            me.postForm.top = post.top
            break
          default:
            break
        }
      }
    }
  }
}
</script>
<style>
  .form-item-inline {
    display: flex;
  }
  .write-article {
    padding: 20px 20px 0 0;
  }
</style>

