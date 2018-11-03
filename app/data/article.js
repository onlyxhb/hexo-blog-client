
const response = require('../utils/response')
const { getPrefix } = require('../utils')
const path = require('path')
const glob = require('glob')
const fs = require('fs-extra')
const { json, markdown } = require('../utils/hexo')

const getArticleDetail = (filename) => {
  return new Promise ((resolve, reject) =>{
    try {
      if (!filename) {
        reject('文章路径不能为空!')
      }
      fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
          reject(`文章读取失败：${ reason }`)
        } else {
          resolve(json(data))
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
        Promise.all(data.map(filename => {
          return getArticleDetail(filename)
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
  }
}