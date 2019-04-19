<template>
  <articleMain type="articleTags">
    <!-- 右侧部分自定义 -->
    <div class="no-data" slot="right-item">
      <operation/>
      <div class="no-data-content">
        <i class="iconfont icon-tags"/>
        <p>无内容</p>
      </div>
    </div>
  </articleMain>
</template>

<script>
  import ArticleMain from '@/layout/Main'
  import Operation from '@/components/Operation'
  export default {
    name: 'tags-page',
    components: {ArticleMain, Operation}
  }
</script>

<style lang="scss" scoped>
// 没数据
.no-data {
  position: relative;
  width: 100%;
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
      color: #E7A44E;
      font-size: 60px;
    }
    p {
      color: #C1CCD6;
    }
  }
}
</style>
