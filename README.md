# HexoBlogClient


[![Gitter](https://img.shields.io/gitter/room/Xonlystar/hexo-blog-client.svg)](https://gitter.im/hexo-blog-client/Lobby?utm_source=badge) 
[![GitHub issues](https://img.shields.io/github/issues/Xonlystar/hexo-blog-client.svg)](https://github.com/Xonlystar/hexo-blog-client/issues) 
[![GitHub license](https://img.shields.io/github/license/Xonlystar/hexo-blog-client.svg)](https://github.com/Xonlystar/hexo-blog-client/blob/master/LICENSE) 
[![Download](https://img.shields.io/badge/downloads-master-green.svg)](https://codeload.github.com/Xonlystar/hexo-blog-client/zip/master) [![Hexo Version](https://img.shields.io/badge/hexo-%3E%3D%203.0-blue.svg)](http://hexo.io) 
[![GitHub forks](https://img.shields.io/github/forks/Xonlystar/hexo-blog-client.svg)](https://github.com/Xonlystar/hexo-blog-client/network) 
[![GitHub stars](https://img.shields.io/github/stars/Xonlystar/hexo-blog-client.svg)](https://github.com/Xonlystar/hexo-blog-client/stargazers)

 [个人博客](https://blog.onlystar.site) | QQ 交流群: `212388109`
> HexoBlogClient是一个采用`Electron + Vue`开发的Hexo博客管理客户端，基于[HexoClient](https://github.com/gaoyoubo/hexo-client.git)二次开发

## 特性
  - 简单漂亮，文章易读易修改
  - 支持文章置顶显示
  - 博客文章的增删改查
  - 文章支持七牛图片上传
  - 支持hexo generate
  - 支持hexo deploy

## 后续开发计划
- [x] 搜索文章, 分类以及标签搜索
- [x] 软件设置
- [x] 一键编译、发布博客
- [ ] 将文章保存为草稿
- [ ] 优化关键词交互
- [ ] 本地预览博客
- [ ] 自动保存文章
- [ ] 检查软件更新
- [ ] 软件消息提示
- [ ] 操作日志记录

## 开发
使用`git clone`下载到本地开发
```bash
git clone https://github.com/Xonlystar/hexo-blog-client.git
```
安装依赖并运行
```bash
# 使用npm 或者 yarn 安装依赖
npm install // yarn

# 开发模式
npm run serve // yarn serve

# 打包
npm run build // yarn build
```

注意
> 本人打包发布后simple-git使用报错，暂未发现好的方法，现提供一个修改simple-git源码的方法来规避此问题
```js
// node_modules/simple-git/src/git.js  1591行`requireResponseHandler`修改为
function requireResponseHandler (type) {
    return require('./responses/' + type)
}
```

更换icon图标
```bash
# 安装
npm install --save-dev electron-icon-builder

# scripts中添加
"generate-icons": "electron-icon-builder --input=./public/icon.png --output=build --flatten"
```
## [配置](https://blog.onlystar.site/2019/04/21/hexoblogclient-shi-yong-zhi-nan/)

## 效果截图

![image](https://user-images.githubusercontent.com/19361551/56090870-5268eb80-5eda-11e9-8e0a-ec499eeecf1b.png)
![image](https://user-images.githubusercontent.com/19361551/56090972-7bd64700-5edb-11e9-8bad-64e44fce4847.png)
![image](https://user-images.githubusercontent.com/19361551/56090878-6f9dba00-5eda-11e9-936d-4ed96279bfbd.png)
![image](https://user-images.githubusercontent.com/19361551/56090885-83e1b700-5eda-11e9-8748-41eb79b328a3.png)
![image](https://user-images.githubusercontent.com/19361551/56090989-95778e80-5edb-11e9-9aec-7637ed4193f9.png)
![image](https://user-images.githubusercontent.com/19361551/56090893-922fd300-5eda-11e9-8527-24790d44ae03.png)
![image](https://user-images.githubusercontent.com/19361551/56090898-9f4cc200-5eda-11e9-98b1-53785c193714.png)


## 版本更新记录
### v1.2.6 (2019-05-01)
- 新增左侧列表可收缩功能
- 修复mac下不能复制粘贴的问题
- 修复当修改font-matter时错乱的问题

### v1.2.5 (2019-04-21)
- 更新界面，参考有道云笔记
- 支持更换头像，可以自定义上传daogit
- 支持最小化到系统任务栏
- 支持分类和标签搜索
- 支持分类和标签的列表展示以及各自对应的文章条数

### v1.2.3 (2019-01-02)
- 支持i18n
- 新增sm.ms图床
- 支持上传粘贴板图片
- 优化设置页面布局
- 修复发布时仅支持master分支的问题

### v1.2.2 (2018-12-04)
- 支持文章搜索
- 优化新建、编辑文章页布局
- 优化调整发布功能按钮
- 支持新建文章、发布快捷键操作
- 其他页面细节优化

### v1.2.1
- MacOS下无边框样式
- 调整菜单栏布局
- 修改UI配色和界面细节
- 修复初始化时选择hexo目录失败的问题
- 升级electron版本到3.x
- 其他细节修改

### v1.1.3
- 升级markdown编辑器，使用mavonEditor编辑器（https://github.com/hinesboy/mavonEditor）。
- 修复图片文章列表过长是，切换页面滚动位置丢失的问题。
- 重构代码，优化调用逻辑和布局层级关系。
- 升级electron版本到2.0.6。

### v1.1.0
- 优化页面配色。
- 优化文章预览、详情页面展示样式。
- 文章内容修改后离开页面进行友好提示。
- 支持hexo generate 和 hexo deploy。