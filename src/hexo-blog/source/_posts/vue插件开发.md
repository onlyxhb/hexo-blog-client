---
title: vue插件开发
date: 2018-10-23 20:35:12
categories: 前端
tags: vue
img: https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540308162821&di=9ef3d7f97d38dde31e014e1da7d38398&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb812c8fcc3cec3fd8125d148dd88d43f879427f7.jpg
---

> 在vue项目开发中，使用组件的频率远大于插件，但是组件需要在页面中用components引用，多个页面使用就要引用多次，这样使用率很高的组件一般我们希望全局注册后直接就可以在相应页面使用，因此我们需要将他们封装成插件

简而言之，插件可以封装组件，组件可以暴露数据给插件

#### 分类
- 1、添加全局方法或者属性
- 2、添加全局资源：指令/过滤器/过渡等
- 3、通过全局 mixin 方法添加一些组件选项
- 4、添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
- 5、一个库，提供自己的 API，同时提供上面提到的一个或多个功能

#### 使用
- 直接用Vue.use方法，它需要在初始化vue之前使用

```js
// 调用 MyPlugin.install(Vue)
Vue.use(MyPlugin)

new Vue({
  //... options
})
```
- 传入对象
```
Vue.use(MyPlugin, { someOption: true })
```

#### 开发
插件的开发需要一个公共的方法：install

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}

```