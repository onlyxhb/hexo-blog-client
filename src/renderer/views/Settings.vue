<template>
  <el-main class="setting">
    <el-form label-width="80px" :model="sysConfig">
      <el-form-item label="Hexo目录" label-width="120px">
        <el-input v-model="sysConfig.path">
          <el-button slot="append" @click="getSystemFilePath">选择</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="七牛AccessKey" label-width="120px">
        <el-input v-model="sysConfig.qiniuAccessKey"/>
      </el-form-item>
      <el-form-item label="七牛SecretKey" label-width="120px">
        <el-input v-model="sysConfig.qiniuSecretKey"/>
      </el-form-item>
      <el-form-item label="七牛Bucket" label-width="120px">
        <el-input v-model="sysConfig.qiniuBucket"/>
      </el-form-item>
      <el-form-item label="七牛域名" label-width="120px">
        <el-input v-model="sysConfig.qiniuHost"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveConfig">保存</el-button>
        <el-button type="primary" @click="clearHexo">清除</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import configManager from '@/service/ConfigManager'

  export default {
    data () {
      return {
        sysConfig: {
          base: '',
          qiniuAccessKey: '',
          qiniuSecretKey: '',
          qiniuBucket: '',
          qiniuHost: ''
        }
      }
    },
    created () {
      var me = this
      configManager.getSysConfig().then(sysConfig => {
        me.sysConfig = sysConfig
      })
    },
    methods: {
      saveConfig () {
        var me = this
        configManager.setSysConfig(this.sysConfig).then(() => {
          me.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success'
          })
        })
      },
      async clearHexo () {
        let loading = this.$loading({
          lock: true,
          text: '清除中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        let hexo = this.$store.state.Hexo.instance
        try {
          await hexo.call('clean', {})
          this.$notify.success('清除成功')
        } catch (err) {
          console.error(err)
          this.$notify.error('清除失败')
        } finally {
          loading.close()
        }
      },
      /**
       * @func 得到系统的路径
       */
      getSystemFilePath () {
        let ipcRenderer = this.$electron.ipcRenderer
        ipcRenderer.send('open-file-dialog')
        ipcRenderer.on('selected-directory', (event, path) => {
          this.sysConfig.path = path.join()
        })
      }
    }
  }
</script>
<style lang="scss">
.setting {
  padding-top: 20px;
  padding-right: 20px;
}
</style>

