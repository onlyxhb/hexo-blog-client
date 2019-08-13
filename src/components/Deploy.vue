<template>
  <div>
    <i v-if ="type === 'upload'" class="el-icon-upload" @click="deploy"/>
    <i v-else class="el-icon-download" @click="downLoad"/>
    <div
        v-if="showConsoleLoading"
        class="loading-console el-loading-mask loading-console is-fullscreen"
        :style="{width: deployConsoleWidth, height: deployConsoleHeight}"
      >
        <div class="el-loading-spinner">
          <i class="el-icon-loading"></i>
          <div class="el-loading-text el-scrollbar">
            <pre>{{deployConsoleText}}</pre>
            <div ref="consoleScrollEnd"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Utils from '@/service/Utils'
import when from 'when'
import { exec } from 'child_process'
import fixPath from 'fix-path'

export default {
  name: 'Deploy',
  props: {
    type: {
      type: String,
      default: 'upload'
    }
  },
  data () {
    return {
      git: {},
      showConsoleLoading: false,
      deployConsoleText: '发布中...\n',
      deployConsoleWidth: '0px',
      deployConsoleHeight: '0px'
    }
  },
  mounted () {
    let workingDir = this.$store.state.Config.config.path
    this.git = require('little-git/promise')(workingDir)
    window.git = this.git
    window.addEventListener('resize', this.deployConsoleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.deployConsoleResize)
  },
  methods: {
    deploy () {
      if (this.$store.state.Config.config.shellDeploy) {
        this.deployHexoWithShell()
      } else {
        this.deployHexoWithGit()
      }
    },
    deployHexoWithShell () {
      this.deployConsoleText = '发布中...\n'
      this.deployConsoleResize()
      this.showConsoleLoading = true
      this.doDeployHexoWithShell().then(() => {
        // 执行成功
        this.deployConsoleAppendText('\n执行成功')
        this.$message({
          showClose: true,
          message: '发布成功',
          duration: 2000,
          type: 'success',
          onClose: () => {
            this.showConsoleLoading = false
          }
        })
      }, () => { // 执行失败
        this.deployConsoleAppendText('\n执行失败')
        this.$message({
          showClose: true,
          message: '发布失败',
          duration: 2000,
          type: 'error',
          onClose: () => {
            this.showConsoleLoading = false
          }
        })
      }, data => { // 执行中
        this.deployConsoleAppendText(data)
      })
    },
    doDeployHexoWithShell () {
      var deferred = when.defer()
      fixPath()
      const workProcess = exec('hexo generate -d', {
        cwd: this.$store.state.Config.config.path,
        maxBuffer: 5000 * 1024 // 默认 200 * 1024
      })
      // 打印正常的后台可执行程序输出
      workProcess.stdout.on('data', function (data) {
        deferred.notify(data)
      })
      // 打印错误的后台可执行程序输出
      workProcess.stderr.on('data', function (data) {
        deferred.notify(data)
      })
      // 退出之后的输出
      workProcess.on('close', function (code, signal) {
        if (code === 0) {
          deferred.resolve(0)
        } else {
          deferred.reject(code, signal)
        }
      })
      return deferred.promise
    },
    async deployHexoWithGit () {
      let simpleStatus = await this.simpleStatus()
      if (simpleStatus.modified) {
        this.commit(simpleStatus.branch, 'Commit at ' + Utils.formatDate(new Date()))
      } else {
        this.$message.warning(this.$t('deploy.nochange'))
      }
    },
    async downLoad () {
      let simpleStatus = await this.simpleStatus()
      if (simpleStatus.modified) {
        this.$message.error(this.$t('download.hasModified'))
        return
      }
      let loading = this.$loading({
        lock: true,
        text: this.$t('download.loading'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        await this.git.pull()
        this.$message(this.$t('download.success'))
      } catch (error) {
        this.$message.error(this.$t('download.loading'))
        console.log(error)
      } finally {
        loading.close()
      }
    },
    async simpleStatus () {
      let status = { modified: false, branch: 'master' }
      try {
        let statusSummary = await this.git.status()
        // console.log('statusSummary: ', statusSummary)
        if (statusSummary.modified.length > 0 || statusSummary.not_added.length > 0 || statusSummary.deleted.length > 0) {
          status.modified = true
        }
        status.branch = statusSummary.current
        return status
      } catch (e) {
        return status
      }
    },

    async commit (branch, msg) {
      let loading = this.$loading({
        lock: true,
        text: this.$t('deploy.loading'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        await this.git.add('./*')
        await this.git.commit(msg)
        await this.git.push('origin', branch)
        this.$message(this.$t('deploy.success'))
      } catch (e) {
        this.$message.error(this.$t('deploy.error'))
      } finally {
        loading.close()
      }
    },
    deployConsoleAppendText (text) {
      this.deployConsoleText += text
      // if (
      //   this.$refs.consoleScrollEnd &&
      //   this.$refs.consoleScrollEnd.scrollIntoView
      // ) {
      //   this.$refs.consoleScrollEnd.scrollIntoView() // 滚动到最底部
      // }
    },
    deployConsoleResize () {
      this.deployConsoleWidth = document.documentElement.clientWidth + 'px'
      this.deployConsoleHeight = document.documentElement.clientHeight + 'px'
    }

  }
}
</script>
