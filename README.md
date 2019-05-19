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
- [x] 检查软件更新
- [ ] 将文章保存为草稿
- [ ] 优化关键词交互
- [ ] 本地预览博客
- [ ] 自动保存文章
- [ ] 软件消息提示
- [ ] 操作日志记录

## 开发
使用`git clone`下载到本地开发
```bash
git clone https://github.com/Xonlystar/hexo-blog-client.git
```
安装依赖并运行
```bash
# 使用npm 安装依赖
npm install

# 开发模式
npm start

# 打包
npm run build
```

更换icon图标
```bash
# 安装
npm install --save-dev electron-icon-builder

# scripts中添加
"generate-icons": "electron-icon-builder --input=./public/icon.png --output=build --flatten"
```
## [配置](https://blog.onlystar.site/2018/10/21/hexoblogclient-shi-yong-zhi-nan/)

## 效果截图

![image](https://user-images.githubusercontent.com/19361551/56090870-5268eb80-5eda-11e9-8e0a-ec499eeecf1b.png)
![image](https://user-images.githubusercontent.com/19361551/56090972-7bd64700-5edb-11e9-8bad-64e44fce4847.png)
![image](https://user-images.githubusercontent.com/19361551/56090878-6f9dba00-5eda-11e9-936d-4ed96279bfbd.png)
![image](https://user-images.githubusercontent.com/19361551/56090885-83e1b700-5eda-11e9-8748-41eb79b328a3.png)
![image](https://user-images.githubusercontent.com/19361551/56090989-95778e80-5edb-11e9-9aec-7637ed4193f9.png)
![image](https://user-images.githubusercontent.com/19361551/56090893-922fd300-5eda-11e9-8527-24790d44ae03.png)
![image](https://user-images.githubusercontent.com/19361551/56090898-9f4cc200-5eda-11e9-98b1-53785c193714.png)


## 版本更新记录
### v1.2.7 (2019-06-01)
- 新增Front-Matters编辑功能
- 新增同步git仓库文章功能
- 优化文章搜索功能，大小写字母皆可模糊搜索
- 新增检查更新功能
- 新增博客链接地址配置，可打开博客
- 修复左侧文章列表宽度显示偶尔变动的问题
- 修复linux下图标缺失的问题
- 修复linux下系统托盘显示异常的问题
- Mac新增Touchbar功能(试验性功能)

### v1.2.6 (2019-05-18)
- 新增markdown编辑器快捷键(ctrl + s)保存功能
- 升级markdown编辑器版本
- 修复https://sm.ms图床设置不生效的问题
- 支持常用快捷键操作
- 修复部分情况预览文章空白的问题
- 修复偶尔发布博客失败的问题

### v1.2.5 (2019-04-24)
- 更新界面，参考有道云笔记
- 支持更换头像，可以自定义上传daogit
- 支持最小化到系统任务栏
- 支持分类和标签搜索
- 支持分类和标签的列表展示以及各自对应的文章条数