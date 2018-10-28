# hexo-client

> 这是一个基于electron-vue搭建的hexo博客管理客户端,我的博客网站： [星空守候的博客](https://blog.onlystar.site)

### 功能简介
- 新增、编辑、删除文章
- 首页文章列表按照时间排序显示
- 本地博客预览
- 本篇文章预览
- 软件系统环境配置
- 文章支持七牛图片上传
- 支持hexo clean、generate、deploy
- windows/mac/linux/web 平台打包
- 关于我

### 后续开发计划
- [x] 左侧搜索文章
- [ ] 优化关键词交互
- [x] 自定义顶部菜单栏
- [ ] 更换logo
- [ ] 更换代码高亮插件
- [ ] 代码显示行号
- [ ] 系统设置补充
- [ ] 自动保存文章
- [ ] 将文章保存为草稿
- [ ] 窗口置顶与取消置顶
- [ ] 软件消息提示
- [ ] 操作日志记录
- [ ] 检查软件更新

### 截屏预览
![](http://file.mspring.org/75b72e173544f8d97bd439973e022f65!detail)
![](http://file.mspring.org/af961ed25d01cceb2bb64855324c9cc9!detail)
![](http://file.mspring.org/3376dc96e75b3719f1a40e65dd54b71e!detail)
![](http://file.mspring.org/8a017cf3cb56561da107383ac21da2df!detail)


### 开发

``` bash
# install dependencies
yarn

# dev
yarn dev

# build electron application for production
yarn build
yarn build:win
yarn build:mac

# lint all JS/Vue component files in `src/`
yarn lint

# use tip
第一次使用需要选择你的hexo博客的目录，可手动输入，也可选择


```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
