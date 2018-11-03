const articleServer = require('./data/article.js')
articleServer['$article.list'](function (result) {
  // console.log(result)
})

// const fs = require('fs-extra')
// const { json, markdown } = require('./utils/hexo')
// fs.readAsync('E:/前端学习/个人博客/hexo-blog/source/_posts/阿里前端监控.md', 'utf-8').then(data => {
//   console.log(data)
// }).catch(function (reason) {
//   console.log(`文章读取失败：${ reason }`)
// })
// fs.readFile('E:/前端学习/个人博客/hexo-blog/source/_posts/Unable to preventDefault inside passive event listener.md', 'utf8', function(err, data) {
//   console.log(json(data))
// })