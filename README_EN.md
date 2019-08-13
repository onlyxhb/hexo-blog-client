# HexoBlogClient


[![Gitter](https://img.shields.io/gitter/room/Xonlystar/hexo-blog-client.svg)](https://gitter.im/hexo-blog-client/Lobby?utm_source=badge) 
[![GitHub issues](https://img.shields.io/github/issues/Xonlystar/hexo-blog-client.svg)](https://github.com/Xonlystar/hexo-blog-client/issues) 
[![GitHub license](https://img.shields.io/github/license/Xonlystar/hexo-blog-client.svg)](https://github.com/Xonlystar/hexo-blog-client/blob/master/LICENSE) 
[![Download](https://img.shields.io/badge/downloads-master-green.svg)](https://codeload.github.com/Xonlystar/hexo-blog-client/zip/master) [![Hexo Version](https://img.shields.io/badge/hexo-%3E%3D%203.0-blue.svg)](http://hexo.io) 
[![GitHub forks](https://img.shields.io/github/forks/Xonlystar/hexo-blog-client.svg)](https://github.com/Xonlystar/hexo-blog-client/network) 
[![GitHub stars](https://img.shields.io/github/stars/Xonlystar/hexo-blog-client.svg)](https://github.com/Xonlystar/hexo-blog-client/stargazers)

 [中文说明](./README.md) | [personal blog](https://blog.onlystar.site) | QQ communication group of: `212388109`
> HexoBlogClient is a blog management client developed by `Electron + Vue`, based on [HexoClient](https://github.com/gaoyoubo/hexo-client.git) secondary development

## features
  - simple and beautiful, the article is easy to read and modify
  - support article top display
  - the addition of blog article delete change check
  - article support seven cattle picture upload
  - support hexo generate
  - support hexo deploy

## the next development plan
- [x] search articles, categories, and tag search
- [x] the software settings
- [x] compile and publish blog with one click
- [x] check software updates
- [x] software message prompt
- [x] optimize keyword interaction
- [x] local preview blog
- [ ] save the article as a draft
- [ ] autosave
- [ ] operation logging

## development
Using ` git clone ` downloaded to the local development
```bash
git clone https://github.com/Xonlystar/hexo-blog-client.git
```
Install dependencies and run
```bash
# use npm to install dependencies
npm install

# development mode
npm start

# building
npm run build
```

replace icon
```bash
# install
npm install --save-dev electron-icon-builder

# add in scripts
"generate-icons": "electron-icon-builder --input=./public/icon.png --output=build --flatten"
```
## [configuration](https://blog.onlystar.site/2018/10/21/hexoblogclient-shi-yong-zhi-nan/)

## 下载地址
[https://github.com/Xonlystar/hexo-blog-client/releases/latest](https://github.com/Xonlystar/hexo-blog-client/releases/latest)

## effect of screenshots

![列表页](https://user-images.githubusercontent.com/19361551/57982641-93749280-7a7a-11e9-9dd8-485943d71f78.png)
![列表页-伸展](https://user-images.githubusercontent.com/19361551/57982663-054cdc00-7a7b-11e9-8251-48c94fddc6be.png)
![分类页](https://user-images.githubusercontent.com/19361551/57982655-f5cd9300-7a7a-11e9-9566-5da49f1b3d77.png)
![标签页](https://user-images.githubusercontent.com/19361551/57982661-01b95500-7a7b-11e9-8b63-f4726d9a30d1.png)
![筛选页](https://user-images.githubusercontent.com/19361551/57982697-712f4480-7a7b-11e9-88c5-268f22bfccd2.png)
![预览页](https://user-images.githubusercontent.com/19361551/58368118-12eedf80-7f1b-11e9-98c4-8dbf87d7fcfe.png)
![关于页](https://user-images.githubusercontent.com/19361551/57982878-9fae1f00-7a7d-11e9-9061-0d0a05b11844.png)
![配置页](https://user-images.githubusercontent.com/19361551/57982906-11866880-7a7e-11e9-9537-f0a42d4a0ab4.png)
![新增文章页](https://user-images.githubusercontent.com/19361551/57982917-1f3bee00-7a7e-11e9-8107-a8022116f0a0.png)
![文章配置](https://user-images.githubusercontent.com/19361551/57982991-362f1000-7a7f-11e9-9800-eb49309584a4.png)
![修改文章页](https://user-images.githubusercontent.com/19361551/57982954-c3259980-7a7e-11e9-9689-729b3f519a44.png)

## version update record
### 1.2.9 (2019-08-13)
- Fix the problem of `loading'when software opens after `hexo' path changes
-` Remove warning messages that appear in the `Merge'Optimized Repair `Console
-` Fix the problem that the pictures cannot be displayed in the third party software after going to bed
-` Add `Aliyun OSS map bed
-` Add `Google Analytics'.
-` Add Draft Function
-` Added `publishing mode to support `hexo deployment'.`

### 1.2.8 (2019-06-01)
- fixed bug where the first item in the list was selected instead of the new item by default after a new article was added
- fixed an issue that appeared after clicking the cancel button in the popup box of a newly added article
- fixed an issue where some irregular link links could not be opened.
- fixed an issue where the menu buttons of articles on small screens were not fully displayed
- fixed a bug where editing articles occasionally became new, resulting in duplicate articles in the articles list
- antd component library is introduced on demand to reduce package size
- new local article preview function (open port 4000, please do not occupy)
- new automatic check update option in Settings
- fixed the problem of blank lines after each edited article is saved

### v1.2.7 (2019-05-20)
- added a front-matters editing feature
- new git repository articles synchronization function
- optimize article search function, upper and lower case letters can be fuzzy search
- new check and update function
- added blog link address configuration, can open the blog
- fixed an issue where the width of the list of articles on the left showed occasional changes
- fix missing ICONS under Linux
- fixed system tray display problem under Linux
- new Touchbar function for Mac (experimental function)
- support two languages: Chinese and English

### v1.2.6 (2019-05-16)
- added markdown editor shortcut (CTRL + s) save function
- update the markdown editor version
- fixed an issue where the https://sm.ms chart bed Settings did not take effect
- support common keyboard shortcuts
- fixed part of the situation preview article blank problem
- fix occasional blog posts that fail

### v1.2.5 (2019-04-24)
- update the interface, refer to youdao cloud notes
- support to change the avatar, can be customized upload daogit
- supports minimization to the system taskbar
- support category and label search
- support the display of lists of categories and tags and the number of articles corresponding to each