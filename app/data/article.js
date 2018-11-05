
const response = require('../utils/response')
const { getPrefix } = require('../utils')
const path = require('path')
const glob = require('glob')
const fs = require('fs-extra')
const { json, markdown } = require('../utils/hexo')

// 根据文件名、是否为草稿获取全路径
const getFullpath = (filename, draft) => {
  let dirname = draft === true ? '_drafts' : '_posts'

  return path.join(getPrefix(), 'source', dirname, `${filename}.md`)
}

// 根据全路径获取详情
const getArticleDetail = (filepath) => {
  return new Promise ((resolve, reject) =>{
    try {
      if (!filepath) {
        reject('文章路径不能为空!')
      }
      fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) {
          reject(`文章读取失败：${ reason }`)
        } else {
          let article = json(data) || {}
          article.draft = !!~filepath.indexOf('_drafts')
          resolve(article)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  /**
   * @func 获取文章列表
   * @param {Function} done 回调
   * @return {Object}
   */
  '$article.list': (done) => {
    try {
      let prefix = path.join(getPrefix(), 'source')
      // 按条件获取文章路径列表数组
      glob(`${prefix}/*(_drafts|_posts)/**.md`, (err, data) => {
        // 获取每一条文章的详情
        Promise.all(data.map(filepath => {
          return getArticleDetail(filepath)
        })).then(result => {
          return done(response(result))
        }).catch(err => {
          console.log(err)
        })
      })
    } catch (error) {
      console.log(error)
      return done(response(500, '获取文章列表失败'))
    }
  },
  /**
   * @func 保存文章
   * @param {Function} done 回调
   * @param {Object} article 文章详情
   * @param {String} filename 文件名
   * @param {Boolean} draft 是否为草稿
   * @param {Boolean} prevState 本操作之前是否为草稿
   * @return {Object}
   */
  '$article.save': async (done, {article, filename, draft, prevState}) => {
    try {
      if (!filename) {
        return done(response(400, '文件路径不能为空'))
      }
      let filepath = getFullpath(filename, prevState)
      // 存文件
      await fs.outputFile(filepath, markdown(article))
      let newPath = getFullpath(filename, draft)
      // 移动文件
      if (newPath !== filepath) { 
        await fs.move(filepath, newPath)
      }
      return done(response(200, '保存文章成功'))
    } catch (error) {
      console.log(error)
      return done(response(500, '保存文章失败'))
    }
  },
  /**
   * @func 删除文章
   * @param {String} filename
   * @return {Object}
   */
  '$article.del': (done, {filename, draft}) => {
    let filepath = getFullpath(filename, draft)
    fs.remove(filepath, err => {
      if (err) {
        return done(response(500, '保存文章失败'))
      } else {
        return done(response(200, '文章删除成功'))
      }
    })
  }
}