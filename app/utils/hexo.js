module.exports = {
  /**
   * @func 把markdown文件内容转换成JSON格式.
   * @param  {String} article
   * @return {Object}
   */
  json (article) {
    let temp = article.split('---\r\n').slice(1)
    let meta = temp.shift().split('\r\n')
    let body = temp.pop().replace(/^(\r\n)*/, '').trim()
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
      } else  if (parentKey && parentKey === 'tags' ||  parentKey === 'categories' ) { 
        let val = value.replace('- ', '')
        result[parentKey].push(val)
        }
    })

    return Object.assign(result, { body })
  },

  /**
   * @func 把JSON对象的文章转换成markdown格式.
   * @param  {Object} article
   * @return {String}
   */
  markdown (article) {
    return `---\r\ntitle: ${ (article.title || '').trim() }\r\ndate: ${ (article.date || '').trim() }\r\ntags: ${ JSON.stringify(article.tags || []).replace(/[\"|\']/g, '') }\n---\r\n\r\n${ (article.body || '').trim() }`
  }
}
