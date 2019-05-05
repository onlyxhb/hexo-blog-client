<template>
  <el-main style="padding-top: 0px;">
    <transition name="el-fade-in-linear">
      <article class="article">
        <header class="article-header">
          <operation class="window-operation"/>
          <div class="artile-title-box"><label class="article-title">{{ post.title }}</label></div>
          <div class="article-sub">
            <div>
              <label class="article-time">{{ type === 'preview' ? post.date.format('YYYY-MM-DD HH:mm:ss') : post.date }}</label>
              <label class="article-cat" v-for="(category, index) in post.categories.data" :key="index + category.name">
                <el-tag size="small">{{ category.name }}</el-tag>
              </label>
              <label class="article-tag" v-for="(tag, index) in post.tags.data" :key="index + tag.name">
                <el-tag type="info" size="small">{{ tag.name }}</el-tag>
              </label>
            </div>
            <label class="article-opa" @click="handleArticle">
              <i class="click-back" :class="type === 'preview' ? 'el-icon-edit' : 'el-icon-tickets'" name="edit"/>
              <i v-if="type === 'preview'" class="el-icon-delete click-back" name="delete"/>
              <i v-if="type === 'preview'" class="el-icon-share click-back" name="share"/>
              <i v-if="type !== 'preview'" class="el-icon-check click-back" name="save"/>
              <i v-if="type !== 'preview'" class="el-icon-setting click-back" name="setting"/>
              <i v-if="type !== 'preview'" class="el-icon-more click-back" name="more"/>
              <i class="click-back" :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" name="collapse"/>
              <!-- <i v-if="type !== 'preview'" class="el-icon-more click-back" name="more"/> -->
              <!-- <el-popover
                popper-class="custom-popover-more"
                :visible-arrow="false"
                placement="bottom"
                width="165px"
                trigger="click">
                <i class="el-icon-more click-back" name="more" slot="reference"/>
                <el-table :data="popoverData">
                  <el-table-column width="35" align="right" property="icon">
                    <template slot-scope="scope">
                      <i :class="scope.row.icon"/>
                    </template>
                  </el-table-column>
                  <el-table-column width="130" align="left" property="text"></el-table-column>
                </el-table>
              </el-popover> -->
            </label>
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
  export default {
    components: {Operation},
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
      handleArticle (event) {
        let name = event.target.getAttribute('name')
        switch(name) {
          case 'edit' : {
            this.$emit('editPost', this.type === 'preview' ? 'edit' : 'preview')
            break
          }
          case 'delete' : {
            this.$emit('deletePost')
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
  }
}
</style>


