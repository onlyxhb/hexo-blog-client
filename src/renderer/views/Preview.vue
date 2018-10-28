<template>
  <iframe src="http://localhost:4000" frameborder="0" :style="style"></iframe>
</template>

<script>
  export default {
    data () {
      return {
        url: '',
        style: {
          width: '100%',
          height: (document.documentElement.clientHeight - 60) + 'px'
        }
      }
    },
    mounted () {
      window.addEventListener('resize', this.resize)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.resize)
    },
    methods: {
      resize () {
        this.style = {
          width: '100%',
          height: (document.documentElement.clientHeight - 60) + 'px'
        }
      }
    }
  }
</script>
