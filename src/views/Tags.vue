<template>
  <articleMain type="articleTags" :dropdownList="dropdownList"/>
</template>

<script>
  import ArticleMain from '@/layout/Main'
  export default {
    name: 'tags-page',
    components: {ArticleMain},
    data () {
      return {
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
    }
  }
</script>

<style lang="scss" scoped>

</style>
