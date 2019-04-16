import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

// 禁用渲染html，修复一个漏洞
mavonEditor.markdownIt.set({html: false})
