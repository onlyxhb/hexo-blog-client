import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Router from './router'
import * as serviceWorker from './serviceWorker'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
ReactDOM.render(<LocaleProvider locale={zh_CN}><Router /></LocaleProvider>, document.getElementById('root'))
serviceWorker.unregister()
