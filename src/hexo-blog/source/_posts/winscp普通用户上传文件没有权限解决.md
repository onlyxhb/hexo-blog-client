---
title: winscp普通用户上传文件没有权限解决
date: 2018-10-19 20:23:35
img: https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540902585&di=7dd5e762972e1394ef621aed20d5f498&imgtype=jpg&er=1&src=http%3A%2F%2Flc-mhke0kuv.cn-n1.lcfile.com%2F26a8ef1873a9bdaaea9a.jpg
tags: linux
categories: 后端
---
>winscp可以利用sftp协议对linux服务器就行连接，如果是利用普通用户进行登陆的话，上传文件的过程中会出现一些permission denied的提示，并且错误的返回码是3，下面说明下解决方法。

- 查看sftp应用程序的路径
```
# 查看路径
cat /etc/ssh/sshd_config  | grep sftp
# Subsystem sftp /usr/lib/openssh/sftp-server
```
- 查看sftp应用程序的路径为止
```
# 打开配置文件
vim /etc/sudoers
# 修改对应位置
user:  ALL=NOPASSWD:/usr/lib/openssh/sftp-server
```
- 在winscp端进行连接设置
```
# 设置好主机名，端口号，用户名，密码后点击高级
sftp: sudo /usr/lib/openssh/sftp-server
shell: sudo su -
```
配置完成后继续登录即可完成文件上传