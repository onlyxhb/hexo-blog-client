---
title: vue自定义组件使用v-model
date: 2018-10-09 22:56:05
categories: 前端
img: https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539609416356&di=a9f424efa188e40c31ab90b7f1b61050&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F594036c3037b5e7439c274bdb84460519415d646.jpg
tags: vue
---

```html
<input v-model="something">
```
v-model指令其实是下面的语法糖包装而成：
```html
<input :value="something" @input="something=$event.target.value">
```
在一个组件上使用 v-model 时，会简化为：
```html
<custom-input :value="something" @input="value => { something = value }"></custom-input>
```
因此，对于一个带有 v-model 的组件，它应该如下：
接收一个 value prop
触发 input 事件，并传入新值
利用 $emit 触发 input 事件：
this.$emit('input', value)

下面是两个实例
```js
Vue.component('my-component', {
  template: `<div>
  <p>{{currentValue}}</p>
  <input type="text" :value="currentValue" @input="handleInput"/>
  </div>`,
  computed:{
    currentValue:function () {
      return this.value
    }
  },
  props: ['value'], //接收一个 value prop
  methods: {
    handleInput(event) {
      var value = event.target.value;
      this.$emit('input', value); //触发 input 事件，并传入新值
    }
  }
});
<my-component v-model="componentValue"></my-component>
```

```js
Vue.component("my-counter", {
  template: `<div>
  <h1>{{value}}</h1>
  <button @click="plus">+</button>
  <button @click="minu">-</button>
  </div>`,
  props: {
    value: Number //接收一个 value prop
  },
  data: function() {
    return {
      val: this.value
    }
  },
  methods: {
    plus() {
      this.val += 1
      this.$emit('input', this.val) //触发 input 事件，并传入新值
    },
    minu() {
      if(this.val>0){
        this.val -= 1
        this.$emit('input', this.val) //触发 input 事件，并传入新值
      }
    }
  }
});
 <my-counter v-model="componentValue"></my-counter>
```