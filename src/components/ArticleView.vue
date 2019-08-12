<template>
  <el-main style="padding-top: 0;">
    <transition name="el-fade-in-linear">
      <article class="article">
        <header class="article-header">
          <operation class="window-operation"/>
          <div class="artile-title-box"><label class="article-title">{{ post.title }}</label></div>
          <div class="article-sub">
            <div class="article-sub-box">
              <label class="article-time">{{ type === 'add' ? formatDate(post.date) : post.date }}</label>
              <label class="article-cat" v-for="(category, index) in post.categories" :key="index + (category.name || category)">
                <el-tag size="small">{{ category.name || category }}</el-tag>
              </label>
              <label class="article-tag" v-for="(tag, index) in post.tags" :key="index + (tag.name || tag)">
                <el-tag type="info" size="small">{{ tag.name || tag }}</el-tag>
              </label>
            </div>
          </div>
          <div class="article-opa" @click="handleArticle">
            <i class="click-back" :class="type === 'preview' ? 'el-icon-edit' : 'iconfont icon-read'" name="edit"/>
            <i v-if="type === 'preview'" class="el-icon-delete click-back" name="delete"/>
            <i v-if="type === 'preview'" class="el-icon-share click-back" name="share"/>
            <i v-if="type !== 'add'" class="iconfont icon-localview click-back" name="localview"/>
            <i v-if="type !== 'preview'" class="iconfont icon-save click-back" name="save"/>
            <i v-if="type !== 'preview'" class="el-icon-setting click-back" name="setting"/>
            <i v-if="type !== 'preview'" class="el-icon-more click-back" name="more"/>
            <i class="click-back" :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" name="collapse"/>
          </div>
        </header>
        <slot name="right-item-main"/>
      </article>
    </transition>
  </el-main>
</template>

<script>
import Operation from '@/components/Operation'
import { mapGetters, mapMutations } from 'vuex'
import ClientAnalytics from '@/plugins/analytics'
import Utils from '@/service/Utils'
export default {
  components: { Operation },
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      popoverData: [
        {
          icon: 'el-icon-rank',
          text: 'Front-Matter'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      type: 'Article/type',
      collapse: 'Article/collapse'
    })
  },
  methods: {
    ...mapMutations({
      setCollapse: 'Article/setCollapse'
    }),
    formatDate: Utils.formatDate,
    handleArticle (event) {
      let name = event.target.getAttribute('name')
      switch (name) {
        case 'edit' : {
          this.setCollapse(this.type === 'preview')
          this.$emit('editPost', this.type === 'preview' ? 'edit' : 'preview')
          break
        }
        case 'delete' : {
          ClientAnalytics.event('article', 'delete')
          this.$emit('deletePost')
          break
        }
        case 'localview': {
          this.$emit('localviewPost')
          break
        }
        case 'share' : {
          this.$emit('sharePost')
          break
        }
        case 'save' : {
          this.$emit('savePost')
          break
        }
        case 'setting' : {
          this.$emit('setPost')
          break
        }
        case 'more' : {
          this.$emit('setMore')
          break
        }
        case 'collapse' : {
          this.setCollapse(!this.collapse)
          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  overflow: hidden;
  flex: 1;
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
      &::after {
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
        height: 32px;
        &::after {
          content: '';
          display: block;
          width: 130px;
        }
        .article-title {
          overflow: hidden;
          line-height: 32px;
          color: #000;
          font-size: 19px;
          text-overflow: ellipsis;
          white-space: nowrap;
          -webkit-app-region: no-drag;
        }
      }
      .article-sub {
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 200px;
        &-box {
          text-overflow: ellipsis;
          white-space: nowrap;
          -webkit-app-region: no-drag;
        }
      }
      .article-tag,
      .article-cat,
      .article-time {
        margin: 0 5px;
        line-height: 1.5;
        color: #999;
        font-size: 12px;
        -webkit-app-region: no-drag;
      }
      .article-opa {
        z-index: 100;
        position: absolute;
        top: 40px;
        right: 0;
        width: 200px;
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
          &.icon-read {
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
