<template>
  <el-main class="setting-main">
    <operation/>
    <el-form label-width="120px" label-position="left" :model="configForm">
      <el-form-item :label="$t('settingTitlePath')">
        <el-input v-model="configForm.path" style="width:100%" clearable />
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
        <div class="photo-upload" :class="{hasPic: getDisplayPic}">
          <img :src="getPhoto" v-if="getDisplayPic"/>
          <i class="el-icon-delete" v-if="getDisplayPic" @click="handleRemove"/>
          <el-upload
            action=""
            v-if="!getDisplayPic"
            list-type="picture-card"
            :before-upload="customUpload">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveConfig">{{$t('save')}}</el-button>
        <el-button type="primary" @click="OpenDevTool">打开开发者工具</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  import Operation from '@/components/Operation'
  import githubUploader from '@/service/GithubUploader'
  import photoPic from '@/mixins/photoPic'
  import { mapActions } from 'vuex'
  const { ipcRenderer } = require('electron')
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
      this.configForm = {...this.configForm, ...this.config}
    },
    computed: {
      getDisplayPic () {
        return this.config.photoPic ? this.getPhoto : ''
      }
    },
    methods: {
      ...mapActions({
        'setConfig': "Config/setConfig"
      }),
      async saveConfig () {
        let message = '保存成功'
        if (this.config.language !== this.configForm.language) {
          message = '保存成功，变更语言需要重启后生效。'
        }
        await this.setConfig(this.configForm)
        this.$message.success(message)
      },
      customUpload (file) {
        githubUploader.upload(file, this.config).then(url => {
          this.setConfig({...this.config, photoPic: url})
        })
        return false
      },
      handleRemove () {
        this.setConfig({...this.config, photoPic: ''})
      },
      OpenDevTool () {
        ipcRenderer.send('openDevTool')
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
    .photo-upload {
      position: relative;
      overflow: hidden;
      width: 150px;
      height: 150px;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      img {
        width: 100%;
        height: 100%;
      }
      &.hasPic::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 6px;
        background-color: #000;
        opacity: 0;
        transition: opacity .3s;
      }
      &.hasPic:hover {
        &::before {
          opacity: .5;
        }
        i {
          position: absolute;
          top: 50%;
          left: 50%;
          color: #fff;
          font-size: 24px;
          transform: translate(-50%, -50%);
          cursor: pointer;
        }
      }
    }
  }
</style>
