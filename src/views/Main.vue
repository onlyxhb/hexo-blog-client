<template>
  <articleMain type="recentArticle" :dropdownList="dropdownList" :hasParentKey="hasParentKey"/>
</template>

<script>
  import ArticleMain from '@/layout/Main'
  export default {
    name: 'main-page',
    components: {ArticleMain},
    data () {
      return {
        hasParentKey: false, // 从分类和标签页带条件过来
        dropdownList: [
          {
            value: '1',
            text: this.$t('filterArc')
          },
          {
            value: '2',
            text: this.$t('filterList')
          }
        ]
      }
    },
    beforeRouteEnter (to, from, next) {
      let key = to.query.key
      next(vm => {
        if (key) vm.hasParentKey = true
        vm.$store.dispatch('Hexo/selectByKey', to.query.key)
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
