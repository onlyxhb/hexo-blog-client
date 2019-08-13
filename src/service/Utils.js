import Config from '@/config'
const hexoUtil = require('hexo-util')
const yfm = require('hexo-front-matter')
const electron = require('electron')
const axios = require('axios')
const { MessageBox, Message, Loading } = require('element-ui')
const { version } = require('../../package.json')
const language = Config.get('language', 'zh')
const $t = require(`@/locales/${language}.json`)
// 系统预订的front matters
const SYSTEM_FRONT_MATTERS = [
  // https://hexo.io/zh-cn/docs/front-matter.html
  'layout', 'title', 'date', 'updated', 'comments', 'tags', 'categories', 'permalink',
  // 为了兼容之前的错误
  '_content', 'originContent',
  // 已经处理了的
  'toc', 'draft', 'id', 'author', 'img', 'content', 'raw', 'summary', 'permalink'
]

class Utils {
  /**
   * 获取文章摘要，截取前100个字符
   * @param {String} content 文章内容
   */
  getPostSummary (content) {
    let textContent = hexoUtil.stripHTML(content).trim()
      .replace(/\n/g, ' ').replace(/\s+/g, ' ')
    if (textContent.length > 100) {
      return textContent.substring(0, 100) + '...'
    } else {
      return textContent
    }
  }

  /**
   * element是否包含指定class
   * @param element
   * @param cls
   * @returns {boolean}
   */
  hasClass (element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1
  }

  /**
   * 将hexo文章格式化成内部使用的格式
   * @param post
   * @returns Object
   */
  formatPost (post) {
    let result = {}
    try {
      result = {
        ...post,
        id: post._id, // 文章唯一id
        date: post.date.format('YYYY-MM-DD hh:mm:ss'), // 创建日期
        updated: post.updated.format('YYYY-MM-DD hh:mm:ss'), // 更新日期
        tags: post.tags.data, // 标签
        categories: post.categories.data, // 分类
        summary: this.getPostSummary(post.content), // 摘要
        layout: post.layout,
        published: post.published,
        content: post.content.trim(), // 文章内容
        _content: post._content.trim() // 文章的markdown
      }
      /**
       * 更改文章中图片的路径，绝对路径改为相对路径
       */
      if (result.content && result._content) {
        /* eslint-disable-next-line */
        result.content = result.content.replace(/"\/images\//g, `"..\/images\/`)
        /* eslint-disable-next-line */
        result._content = result._content.replace(/\(\/images\//g, `\(..\/images\/`)
      }
      let source = post.source.trim()
      if (source) {
        let start = source.indexOf('/')
        let end = source.lastIndexOf('.md')
        if (start !== -1 && end !== -1 && start !== end) {
          result.path = source.substring(start + 1, end)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      return result
    }
  }

  frontMatter (raw) {
    let data = yfm(raw)
    let ret = {}
    Object.keys(data).forEach(key => {
      if (!SYSTEM_FRONT_MATTERS.includes(key)) {
        ret[key] = data[key]
      }
    })
    return ret
  }

  /**
   * 格式化时间
   * @param {String} datetime 时间戳
   * @param {String} type  格式
   */
  formatDate (datetime, type = 'YYYY-MM-DD HH:MM:SS') {
    // 返回规定格式的字符串
    let date = new Date(datetime)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hour = ('0' + date.getHours()).slice(-2)
    const minute = ('0' + date.getMinutes()).slice(-2)
    const second = ('0' + date.getSeconds()).slice(-2)
    switch (type) {
      case 'YYYY-MM-DD' :
        return year + '-' + month + '-' + day
      case 'YYYY-MM-DD HH:MM:SS' :
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }
  }

  checkVersion (autoUpdate = false) {
    console.log(autoUpdate)
    let loading = null
    if (!autoUpdate) {
      loading = Loading.service({
        lock: true,
        text: $t['version.loading'],
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    axios.get('https://api.github.com/repos/Xonlystar/hexo-blog-client/releases/latest', { timeout: 10000 }).then(({ data }) => {
      // 检查版本号
      loading && loading.close()
      if (data.name > version) {
        MessageBox.confirm($t['version.msg'], $t['confirmTips'], {
          confirmButtonText: $t['confirmButtonText'],
          cancelButtonText: $t['cancelButtonText'],
          type: 'success'
        }).then(() => {
          electron.shell.openExternal('https://github.com/Xonlystar/hexo-blog-client/releases/latest')
        }).catch(err => console.log(err))
      } else {
        loading && Message($t['version.no'])
      }
    }).catch(err => {
      console.log(err)
      loading && Message.error($t['timeout'])
      loading && loading.close()
    })
  }
}

export default new Utils()
