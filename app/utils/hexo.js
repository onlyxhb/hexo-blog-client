const os = require('os')
let platform = os.platform()
let changeLine = platform === 'win32' ? '\r\n': '\n'
module.exports = {
  /**
   * @func 把markdown文件内容转换成JSON格式.
   * @param  {String} article
   * @return {Object}
   */
  json (article) {
    let temp = article.split(`---${changeLine}`).slice(1)
    if (!temp || !temp.length) {
      temp = article.split(`---\r\n`).slice(1)
    }
    let meta = temp.shift().split(changeLine)
    let body = platform === 'win32' ? temp.pop().replace(/^(\r\n)*/, '').trim() : temp.pop().replace(/^(\n)*/, '').trim()
    let result = {}
    let parentKey = ''
    meta.forEach((value) => {
      if (value.indexOf(':') !== -1) {
        let arr = value.split(':')
        let key = arr[0]
        let val = arr.slice(1).join(':')

        if ( key === 'tags' ||  key === 'categories' ) {
          result[key] = []
          val = val.replace(/\[|\]/g, '')
          val = val.split(',')
          result[key].push(...val)
        } else {
          result[key] = val.trim()
        }
        parentKey = key
      } else  if (parentKey && (parentKey === 'tags' ||  parentKey === 'categories') ) { 
        let val = value.replace('- ', '')
        val && result[parentKey].push(val)
        }
    })
    if (!result.tags) {result.tags = []}
    if (!result.categories) {result.categories = []}
    return Object.assign(result, { body })
  },

  /**
   * @func 把JSON对象的文章转换成markdown格式.
   * @param  {Object} article
   * @return {String}
   */
  markdown (article) {
    return `---\r\ntitle: ${ (article.title || '').trim() }\r\nimg: ${ (article.img || '').trim() }\r\ntop: ${ article.top || false }\r\ntoc: ${ article.toc || false }\r\ndate: ${ (article.date || '').trim() }\r\nupdated: ${ (article.updated || '').trim() }\r\ntags: ${ JSON.stringify(article.tags || []).replace(/[\"|\']/g, '') }\r\ncategories: ${ JSON.stringify(article.categories || []).replace(/[\"|\']/g, '') }\n---\r\n\r\n${ (article.body || '').trim() }`
  }
}
