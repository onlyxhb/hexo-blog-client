<template>
  <write-view ref="writeViewEdit"/>
</template>

<script>
  import WriteView from '@/components/Write'
  export default {
    components: {
      WriteView
    },
    mounted () {
      this.$refs.writeViewEdit.init()
    }
  }
</script>
<style>
  .form-item-inline {
    display: flex;
  }
</style>