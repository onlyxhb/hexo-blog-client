<template>
  <el-main class="setting-main">
    <operation/>
    <el-form label-width="120px" label-position="left" :model="configForm">
      <el-form-item :label="$t('settingTitlePath')">
        <el-input v-model="configForm.path" style="width:100%"/>
      </el-form-item>
      <el-form-item :label="$t('settingTitleLanguage')">
        <el-select v-model="configForm.language" default-first-option :placeholder="$t('settingLanguagePlaceholder')"
                   style="width:100%">
          <el-option :label="$t('chinese')" value="zh"></el-option>
          <el-option :label="$t('english')" value="en"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('settingTitleImageServer')">
        <el-select v-model="configForm.uploadType" default-first-option :placeholder="$t('settingImageServerPlaceholder')"
                   style="width:100%">
          <el-option label="GitHub" value="github"></el-option>
          <el-option label="sm.ms" value="sm.ms"></el-option>
          <el-option label="七牛" value="qiniu"></el-option>
        </el-select>
      </el-form-item>
      <transition name="el-zoom-in-top">
        <div v-show="configForm.uploadType==='qiniu'">
          <el-form-item label="七牛存储区域">
            <el-select v-model="configForm.qiniuZone" default-first-option placeholder="请选择机房" style="width:100%">
              <el-option label="华东" value="huadong"></el-option>
              <el-option label="华北" value="huabei"></el-option>
              <el-option label="华南" value="huanan"></el-option>
              <el-option label="北美" value="beimei"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="七牛AK">
            <el-input v-model="configForm.qiniuAccessKey" style="width:100%"/>
          </el-form-item>
          <el-form-item label="七牛SK">
            <el-input v-model="configForm.qiniuSecretKey" style="width:100%"/>
          </el-form-item>
          <el-form-item label="七牛Bucket">
            <el-input v-model="configForm.qiniuBucket" style="width:100%"/>
          </el-form-item>
          <el-form-item label="七牛域名">
            <el-input v-model="configForm.qiniuHost" style="width:100%"/>
          </el-form-item>
        </div>
      </transition>
      <el-form-item :label="$t('settingPhoto')">
        <el-upload
          action=""
          list-type="picture-card"
          :file-list="config.photoPic ? [{ name: '图片logo', url: getPhoto }] : []"
          :on-remove="handleRemove"
          :before-upload="customUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveConfig">{{$t('save')}}</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import Operation from '@/components/Operation'
  import githubUploader from '@/service/GithubUploader'
  import photoPic from '@/mixins/photoPic'
  export default {
    data () {
      return {
        fileList: [],
        configForm: {
          base: '',
          language: '',
          uploadType: '',
          qiniuZone: '',
          qiniuAccessKey: '',
          qiniuSecretKey: '',
          qiniuBucket: '',
          qiniuHost: ''
        }
      }
    },
    components: { Operation },
    mixins: [photoPic],
    created () {
      Object.assign(this.configForm, this.config)
    },
    methods: {
      async saveConfig () {
        let message = '保存成功'
        if (this.config.language !== this.configForm.language) {
          message = '保存成功，变更语言需要重启后生效。'
        }
        await this.$store.dispatch('Config/setConfig', this.configForm)
        this.$message.success(message)
      },
      customUpload (file) {
        githubUploader.upload(file, this.config).then(url => {
          this.configForm.photoPic = url
          this.setPhoto(url)
        }, err => {
          console.log(err)
        })
        return false
      },
      handleRemove () {
        this.configForm.photoPic = ''
        this.setPhoto()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .setting-main {
    height: 100%;
     .el-form {
      padding: 0 20px 20px;
      width: 650px;
    }
    padding: 0;
  }
</style>
