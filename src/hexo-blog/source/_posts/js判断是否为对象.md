---
title: js判断是否为对象
date: 2018-10-16 11:53:25
img: https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539672435365&di=f66b38c4695a4a2d35d54bde87fdda5c&imgtype=0&src=http%3A%2F%2Fimages.ofweek.com%2FUpload%2FNews%2F2018-05%2F19%2Fyangbinbin%2F1526701179481096193.jpg
tags: js
categories: 前端
---
- toString
```js
Object.prototype.toString.call(obj) === '[object Object]'   => true
Object.prototype.toString.call(arr) === '[object Array]'    => true
````
- constructor
```js
obj.constructor === Object   => true
arr.constructor === Array    => true
```
- instanceof
```js
obj instaceof Object   => true
arr instaceof Object   => true
obj instaceof Array    => false
arr instaceof Array    => true
```
- typeof
```js
表达式                       返回值
typeof undefined           'undefined'
typeof null                'object'
typeof true                'boolean'
typeof 123                 'number'
typeof "abc"               'string'
typeof function() {}       'function'
typeof {}                  'object'
typeof []                  'object'
```
- jquery方法
```js
$.isPlainObject(obj) 
$.isArray(arr)
$.isFunction(fn)
```
