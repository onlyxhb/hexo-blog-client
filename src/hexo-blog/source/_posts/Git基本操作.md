---
title: Git基本操作
date: 2018-10-17 17:49:02
top: true
img: https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539780019665&di=6fc262a5c718d45d78d50513de0e39a3&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2Fc6e9127e865d1d962b16ef6e7a72b2c3ebda95c6.jpg
tags: git
categories: 前端
---

- 下载远程仓库到本地
`git clone resp [name]`
- 切换分支
`git checkout develop`
- 新建分支
`git checkout -b feature/xhb-test`
- 文件状态
`git status`
- 仓库初始化
`git init`
- 链接本地仓库到远程仓库
`git remote add orgin https://onlystar.git`
- 添加文件到git索引库
`git add index.html`
- 撤销添加文件到git索引库
`git reset HEAD index.html`
- 撤销文件修改
`git checkout index.html`
- 查看异同
`git diff index.html`
- 提交代码
    ```
    /**
     * 是upd（更新）、add（添加）还是del（删除）操作
     * 操作了什么文件（或者什么内容）
     * 为什么要做这个操作（或者能够解决什么bug，解决什么问题）
     */
    git commit -m 首次提交
    ```
- 拉取远程到本地
`git pull`
- 将远程代码仓库的代码下载到本地
`git fetch [resp]`
- 推送到远程仓库
`git push -u origin master`
- 分支合并
`git merge origin/develop`
- 提交日志
`git log`
