<template>
  <el-main class="setting-main">
    <operation/>
    <el-form label-width="120px" label-position="left" :model="configForm">
      <el-form-item :label="$t('settingTitlePath')">
        <el-input v-model="configForm.path" style="width: 100%;" clearable />
      </el-form-item>
      <el-form-item :label="$t('settingTitleLanguage')">
        <el-select v-model="configForm.language" default-first-option :placeholder="$t('settingLanguagePlaceholder')"
                   style="width: 100%;">
          <el-option :label="$t('chinese')" value="zh"></el-option>
          <el-option :label="$t('english')" value="en"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('settingTitleUrl')">
        <el-input v-model="configForm.url" style="width: 100%;" clearable />
      </el-form-item>
      <el-form-item :label="$t('settingTitleImageServer')">
        <el-select v-model="configForm.uploadType" default-first-option :placeholder="$t('settingImageServerPlaceholder')"
                   style="width: 100%;">
          <el-option label="GitHub" value="github"></el-option>
          <el-option label="sm.ms" value="sm.ms"></el-option>
          <el-option label="七牛" value="qiniu"></el-option>
          <el-option label="AliyunOss" value="aliyunOss"></el-option>
        </el-select>
      </el-form-item>
      <transition name="el-zoom-in-top">
        <div v-show="configForm.uploadType==='qiniu'">
          <el-form-item label="七牛存储区域">
            <el-select v-model="configForm.qiniuZone" default-first-option placeholder="请选择机房" style="width: 100%;">
              <el-option label="华东" value="huadong"></el-option>
              <el-option label="华北" value="huabei"></el-option>
              <el-option label="华南" value="huanan"></el-option>
              <el-option label="北美" value="beimei"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="AccessKey">
            <el-input v-model="configForm.qiniuAccessKey" style="width: 100%;" placeholder="七牛AccessKey"/>
          </el-form-item>
          <el-form-item label="SecretKey">
            <el-input v-model="configForm.qiniuSecretKey" style="width: 100%;" placeholder="七牛SecretKey"/>
          </el-form-item>
          <el-form-item label="Bucket">
            <el-input v-model="configForm.qiniuBucket" style="width: 100%;" placeholder="七牛Bucket"/>
          </el-form-item>
          <el-form-item label="Host">
            <el-input v-model="configForm.qiniuHost" style="width: 100%;" placeholder="七牛Host"/>
          </el-form-item>
        </div>
      </transition>
      <transition name="el-zoom-in-top">
        <div v-show="config.uploadType==='aliyunOss'">
          <el-form-item label="Endpoint">
            <el-input v-model="config.aliyunOssEndpoint" style="width: 100%;" placeholder="Aliyun oss endpoint"/>
          </el-form-item>
          <el-form-item label="AccessId">
            <el-input v-model="config.aliyunOssAccessKeyId" style="width: 100%;" placeholder="Aliyun oss accessKeyId"/>
          </el-form-item>
          <el-form-item label="AccessSecret">
            <el-input v-model="config.aliyunOssAccessKeySecret" style="width: 100%;"
                      placeholder="Aliyun oss accessKeySecret"/>
          </el-form-item>
          <el-form-item label="Bucket">
            <el-input v-model="config.aliyunOssBucket" style="width: 100%;" placeholder="Aliyun oss bucket"/>
          </el-form-item>
          <el-form-item label="Host">
            <el-input v-model="config.aliyunOssHost" style="width: 100%;" placeholder="Aliyun oss host"/>
          </el-form-item>
        </div>
      </transition>
      <el-form :inline="true">
        <el-form-item :label="$t('autoUpdate')">
          <el-switch v-model="configForm.autoUpdate" />
        </el-form-item>
        <el-form-item :label="$t('deploy.shell')" style="margin-left: 40px">
          <el-switch v-model="configForm.shellDeploy"></el-switch>
        </el-form-item>
      </el-form>
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
        <el-button type="warning" @click="OpenDevTool">{{$t('devTools')}}</el-button>
        <el-button type="primary" @click="checkVersion(false)">{{$t('checkUpdate')}}</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import Operation from '@/components/Operation'
import githubUploader from '@/service/GithubUploader'
import photoPic from '@/mixins/photoPic'
import { mapActions } from 'vuex'
import Utils from '@/service/Utils'
const { ipcRenderer } = require('electron')
export default {
  data () {
    return {
      fileList: [],
      configForm: {
        base: '',
        url: '',
        language: '',
        uploadType: '',
        qiniuZone: '',
        qiniuAccessKey: '',
        qiniuSecretKey: '',
        qiniuBucket: '',
        qiniuHost: '',
        aliyunOssEndpoint: '',
        aliyunOssAccessKeyId: '',
        aliyunOssAccessKeySecret: '',
        aliyunOssBucket: '',
        aliyunOssHost: '',
        autoUpdate: true
      }
    }
  },
  components: { Operation },
  mixins: [photoPic],
  created () {
    this.configForm = { ...this.configForm, ...this.config }
  },
  computed: {
    getDisplayPic () {
      return this.config.photoPic ? this.getPhoto : ''
    }
  },
  methods: {
    ...mapActions({
      'setConfig': 'Config/setConfig'
    }),
    checkVersion: Utils.checkVersion,
    async saveConfig () {
      let message = this.$t('submit.save.success')
      let changeLanguage = this.config.language !== this.configForm.language
      await this.setConfig(this.configForm)
      if (changeLanguage) {
        this.$confirm(this.$t('saveAndRestart'), this.$t('confirmTips'), {
          confirmButtonText: this.$t('confirmButtonText'),
          cancelButtonText: this.$t('cancelButtonText'),
          type: 'success'
        }).then(() => {
          ipcRenderer.send('restartWin')
        })
        message = this.$t('save success and need restart')
      } else {
        this.$message.success(message)
      }
    },
    customUpload (file) {
      githubUploader.upload(file, this.config).then(url => {
        this.setConfig({ ...this.config, photoPic: url })
      })
      return false
    },
    handleRemove () {
      this.setConfig({ ...this.config, photoPic: '' })
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
      width: 650px;
      padding: 0 20px 20px;
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
          cursor: pointer;
          transform: translate(-50%,-50%);
        }
      }
    }
  }
</style>
