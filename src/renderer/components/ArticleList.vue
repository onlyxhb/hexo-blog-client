<template>

  <div class="article-list">
    <div class="article-list-panel" v-for="post in posts" :key="post.id" ref="post" @click="selected(post.id)"
      :data-id="post.id" v-bind:class="{active: post.id === selectedPostId}">
      <div class="article-list-item">
        <img :src="post.img" alt="图片">
        <div>
          <h4 class="article-title">{{ post.title.length > 20 ? post.title.slice(0, 20) + '...' : post.title }}</h4>
          <p class="article-desc"></p>
          <ul class="article-info">
            <li class="meta">{{ post.date }}</li>
          </ul>

          <a class="article-edit-btn" @click="editPost(post.id)">
            <i class="el-icon-edit-outline"></i>
          </a>
          <a class="article-delete-btn" @click="deletePost(post.id)">
            <i class="el-icon-delete"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {}
    },

    methods: {
      selected: function (selectedId) {
        this.$store.dispatch('Hexo/selectPost', selectedId)
      },

      editPost: function (id) {
        this.$router.push({name: 'edit', params: {postId: id}})
      },
      deletePost (id) {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$store.dispatch('Hexo/deletePost', id)
          this.$notify({title: '成功', message: '删除成功', type: 'success'})
        })
      }
    },

    computed: {
      posts () {
        let posts = this.$store.getters['Hexo/posts']
        let keyword = this.keyword
        if (!keyword) {
          return posts
        }
        return posts.filter(v => ~v.title.indexOf(keyword))
      },
      selectedPostId () {
        let selectedPost = this.$store.getters['Hexo/selectedPost']
        // return this.$store.state.Hexo.selectedPostId
        return selectedPost ? selectedPost._id : null
      },
      keyword () {
        return this.$store.state.Hexo.keyword
      }
    }
  }
</script>

<style>
  .article-list {
    border-right: 1px solid #EDEDED;
    background-color: #fff;
  }

  .article-list-panel.active {
    background-color: #f5f6f7;
  }

  .article-list-panel.active:hover {
    background-color: #f5f6f7;
  }

  .article-list-panel:hover {
    background-color: #f5f6f7;
  }

  .article-list-item {
    padding: 8px;
    position: relative;
    border-bottom: 1px solid #ebeef5;
    cursor: pointer;
  }

  .article-list-item .article-title {
    margin: 0px 0px 5px;
    font-weight: 400;
    font-size: 17px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    word-wrap: break-word;
    word-break: break-all;
  }

  .article-list-item .article-desc {
    margin: 0px 0px 5px;
    color: #999999;
    font-size: 13px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .article-list-item .article-info {
    margin: 0px;
    padding: 0px;
    font-size: 13px;
    color: #909399;
    line-height: 1em;
    list-style: none;
    overflow: hidden;
  }

  .article-list-item .article-info .meta {
    float: left;
    padding-right: 1em;
  }

  .article-edit-btn {
    top: 5px;
    right: 0px;
    opacity: 0;
    position: absolute;
    padding: 5px 6px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    transition: opacity 0.3s ease, background-color 0.1s ease;
    background-color: #d5d5d5;
  }

  .article-delete-btn {
    top: 5px;
    right: 30px;
    opacity: 0;
    position: absolute;
    padding: 5px 6px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
    transition: opacity 0.3s ease, background-color 0.1s ease;
    background-color: #d5d5d5;
  }

  .article-edit-btn:hover, .article-delete-btn:hover {
    background-color: #ffffed;
  }

  .article-list-panel:hover .article-edit-btn,
  .article-list-panel:hover .article-delete-btn {
    opacity: 1;
  }

</style>

<style lang="scss">
.article-list-item {
  display: flex;
  img {
    width: 40px;
    height: 40px;
    margin-top: 2.5px;
    margin-right: 8px;
    vertical-align: middle;
  }
}
</style>


