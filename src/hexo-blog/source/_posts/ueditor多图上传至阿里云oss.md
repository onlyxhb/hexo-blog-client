---
title: ueditor多图上传至阿里云oss
top: true
date: 2018-10-11 10:49:09
categories: 前端
tags: vue
---

> 今天做百度编辑器UEditor多图上传至阿里云oss，打开的弹框中有三个功能：**插入图片**、**本地上传**和**图片搜索**，其中插入**图片功能**正常，剩余两个需要自行完善

#### 本地上传
本地图片上传有两个坑，分别是获取token，以及成功上传后的显示
由于我们需要上传到oss，需要自定义上传服务

相关代码如下
```js
/**
 * 图片上传service
 * @param {Object} context UploadImage对象 图片上传上下文
 * @param {Object} editor  编辑器对象
 * @returns imageUploadService 对象
 */
window.UEDITOR_CONFIG['imageUploadService'] = function (context, editor) {
  return {
    /**
     * 触发fileQueued事件时执行
     * 当文件被加入队列以后触发，用来设置上传相关的数据 (比如: url和自定义参数)
     * @param {Object} file 当前选择的文件对象
     */
    setUploadData: function (file) {
      return file
    },
    /**
     * 触发uploadBeforeSend事件时执行
     * 在文件上传之前触发，用来添加附带参数
     * @param {Object} object 当前上传对象
     * @param {Object} data 默认的上传参数，可以扩展此对象来控制上传参数
     * @param {Object} headers 可以扩展此对象来控制上传头部
     * @returns 上传参数对象
     */
    setFormData: function (object, data, headers) {
      return data
    },
    /**
     * 触发startUpload事件时执行
     * 当开始上传流程时触发，用来设置Uploader配置项
     * @param {Object} uploader
     * @returns uploader
     */
    setUploaderOptions: function (uploader) {
      return uploader
    },
    /**
     * 触发uploadSuccess事件时执行
     * 当文件上传成功时触发
     * @param {Object} res 上传接口返回的response
     * @returns {Boolean} 上传接口返回的response成功状态条件 (比如: res.code == 200)
     */
    getResponseSuccess: function (res) {
      return res.code === 200
    },
    /* 指定上传接口返回的response中图片路径的字段，默认为 url */
    imageSrcField: 'url'
  }
}
```
我们修改的重点便在这个service中，改动如下：
- 在setUploaderOptions中判断是否有token，没有则停止上传并获取token,拿到token后继续上传
```js
setUploaderOptions: function (uploader) {
if (!uploader.ossInfo) {
  uploader.stop()
  // 获取oss图片上传 token
  that.$Post('/get-osstoken', {}).then(res => {
    if (res) {
      uploader.ossInfo = res
      uploader.upload()
    }
  })
}
return uploader
}
```
- 在setFormData中设置oss上传接口所需要的data
```js
setFormData: function (object, data, headers) {
    let ossInfo = context.uploader.ossInfo.data
    data.key = ossInfo.dir + '/' + randomString(10) + getSuffix(data.name)
    data.policy = ossInfo.policy
    data.OSSAccessKeyId = ossInfo.accessid
    data.success_action_status = 200
    data.signature = ossInfo.signature
    let imageList = context.imageList || []
    imageList.push({
      url: ossInfo.host + '/' + key
    })
    return data
}
```
上边的两个方法封装在utils中

```js
 /**
 * 随机码 对指定的字符串中随机取参数位
 */
export const randomString = function (len) {
  len = len || 32
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = chars.length
  var pwd = ''
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

/**
 * 获取文件后缀
 */
export const getSuffix = function (filename) {
  let pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos != -1) {
    suffix = filename.substring(pos)
  }
  return suffix
}
```
获取token的方法也单独封装
```js

/**
 * 获取oss图片上传 token （进入相关页面预先请求）
 * @returns {Promise.<T>}
 */
import Vue from 'vue'
import { storageSet, storageGet } from './storage'
import { ossBaseDir } from './../config'

const expireTime = 3000 * 1000
export const getUploadToken = function (cb, ...param) {
  let nowTime = new Date().getTime()
  let uploadTokenExpireTime = storageGet('uploadTokenExpireTime')
  if (uploadTokenExpireTime && nowTime < uploadTokenExpireTime) {
    var ossInfo = storageGet('uploadTokenInfo')
    return cb(ossInfo, ...param)
  } else {
    Vue.Posting('/admin/user/get-osstoken', { dir: ossBaseDir }).then(res => {
      if (res) {
        let ossInfo = {
          OSSAccessKeyId: res.data.accessid,
          host: res.data.host,
          dir: res.data.dir,
          policy: res.data.policy,
          signature: res.data.signature,
          success_action_status: '200' // 让服务端返回200,不然，默认会返回204
        }
        storageSet('uploadTokenExpireTime', new Date().getTime() + expireTime) // 设置 token 过期时间
        storageSet('uploadTokenInfo', ossInfo)
        return cb(ossInfo, ...param)
      } else {
        // 当错误的时候，进行错误统一处理
        console.log(res)
      }
    }).catch(() => {})
  }
}

```
- 在getResponseSuccess中设置上传成功的状态
```js
getResponseSuccess: function (res) {
  return true
}
```
至此图片上传成功，接下来就是数据展示：

修改dialogs/image/image.js 760行 getInsertList() 函数
  ```js
  getInsertList: function () {
    var i, data, list = [],
      align = getAlign(),
      prefix = editor.getOpt('imageUrlPrefix'),
      imageSrcField = editor.getOpt("imageUploadService")(this, editor).imageSrcField || 'url';
    for (i = 0; i < this.imageList.length; i++) {
      data = this.imageList[i];
      // 去除无效的图片对象
      if(data[imageSrcField]) { // 添加这行
        list.push({
            src: prefix + data[imageSrcField],
            _src: prefix + data[imageSrcField],
            alt: data.original,
            floatStyle: align
        });
      }   // 添加这行
    }
    return list;
  }
  ```
#### 图片搜索
图片搜索可以正常搜到图片并展示，但是点击确认后在编辑器中未能正常显示

解决方法：修改neditor.all.js源码
找到25857行开始的下列源码注释

```js
var src = ci.getAttribute("_src") || ci.src || "";
if (/^(https?|ftp):/i.test(src) && !test(src, catcherLocalDomain)) {
  remoteImages.push(src);
  // 添加上传时的uploading动画
  domUtils.setAttributes(ci, {
    class: "loadingclass",
    _src: src,
    src: loadingIMG
  })
}
```
