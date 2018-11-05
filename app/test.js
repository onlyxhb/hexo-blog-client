// 测试读取平台信息
// const os = require('os')
// console.log(os.platform())
// 测试读取文章
// const articleServer = require('./data/article.js')
// articleServer['$article.list'](function (result) {
//   console.log(result)
// })
// 测试存储文章
// let request = {
//   article: {
//     img: 'https://www.baidu.com',
//     title: '今天真高兴啊',
//     top: true,
//     toc: false,
//     date: '2017-12-01',
//     updated: '2018-12-01',
//     tags: ['js', 'css'],
//     categories: ['前端', '后端'],
//     body: '# 1314520'
//   },
//   filename: '今天真高兴啊',
//   draft: true,
//   prevState: false
// }
// const articleServer = require('./data/article.js')
// articleServer['$article.save'](function (result) {
//   // console.log(result)
// }, request)
// 测试删除文章
const articleServer = require('./data/article.js')
articleServer['$article.del'](function (result) {
  console.log(result)
}, {filename: '这是我的草稿', draft: false})