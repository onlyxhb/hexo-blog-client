<template>
  <articleMain type="articleTags">
    <!-- 右侧部分自定义 -->
    <div class="no-data" slot="right-item">
      <operation/>
      <div class="no-data-content">
        <i class="iconfont icon-tags"/>
        <p>{{$t('noArticleMsg')}}</p>
      </div>
    </div>
  </articleMain>
</template>

<script>
import ArticleMain from '@/layout/Main'
import Operation from '@/components/Operation'
export default {
  name: 'tags-page',
  components: { ArticleMain, Operation }
}
</script>

<style lang="scss" scoped>
// 没数据
.no-data {
  position: relative;
  flex: 1;
  height: 100%;
  &-content {
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
    padding-top: 35%;
    box-sizing: border-box;
    text-align: center;
    i {
      color: #e7a44e;
      font-size: 60px;
    }
    p {
      color: #c1ccd6;
    }
  }
}
</style>
