---
title: Unable to preventDefault inside passive event listener
date: 2018-10-22 20:23:48
img: https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3797342312,1261963718&fm=26&gp=0.jpg
tags: bug
categories: 测试
---

> 在做`禁止浏览器或微信下拉出现网页来源`的这个功能时用到了下面的代码

```js
document.body.addEventListener('touchmove', e => e.preventDefault())
```

在控制台看到了下面的报错：
```js
Unable to preventDefault inside passive event listener due to target being treated as passive. 
See https://www.chromestatus.com/features/5093566007214080
```

于是google后发现
```js
由于浏览器必须要在执行事件处理函数之后，才能知道有没有掉用过 preventDefault() ，这就导致了浏览器不能及时响应滚动，略有延迟。

所以为了让页面滚动的效果如丝般顺滑，从 chrome56 开始，在 window、document 和 body 上注册的 touchstart 和 touchmove
事件处理函数，会默认为是 passive: true。浏览器忽略执行 preventDefault() 就可以第一时间滚动了，并不会阻止默认行为。

举例：
wnidow.addEventListener('touchmove', func) 效果和下面一句一样
wnidow.addEventListener('touchmove', func, { passive: true })
```
那么如何解决这个问题呢？不让控制台提示，而且 preventDefault() 有效果呢？
#### 两个方案：
- 1、注册处理函数时，用如下方式，明确声明为不是被动的
```js
doc.body.addEventListener('touchmove', e => e.preventDefault(), { passive: false })
```
- 2、CSS 属性 touch-action: none;
这样任何触摸事件都不会产生默认行为，但是 touch 事件照样触发。
