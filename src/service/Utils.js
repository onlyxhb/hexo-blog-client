const hexoUtil = require('hexo-util')
const yfm = require('hexo-front-matter')

// 系统预订的front matters
const SYSTEM_FRONT_MATTERS = [
  // https://hexo.io/zh-cn/docs/front-matter.html
  'layout', 'title', 'date', 'updated', 'comments', 'tags', 'categories', 'permalink',
  // 为了兼容之前的错误
  '_content', 'originContent',
  // 已经处理了的
  'toc'
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
   * @returns {{date: *, summary: (*|*), path: *, author: CodeCommit.UserInfo | string | {email: string; name: string} | null | *, id: *, categories: *, title: *, tags: *}}
   */
  formatPost (post) {
    return {
      id: post._id,
      title: post.title,
      path: post.path,
      date: post.date.format('YYYY-MM-DD hh:mm:ss'),
      author: post.author,
      top: post.top,
      tags: post.tags.data,
      categories: post.categories.data,
      summary: this.getPostSummary(post.content)
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
}

export default new Utils()
