import React from 'react'
import {Row, Col} from 'antd'
import Header from './components/Header'
import NavLeft from './components/NavLeft'
import './style/common.scss'
export default class Main extends React.Component {
  render () {
    return (
      <div className="page-common">
        {/* 这里是左侧内容区域 */}
        <NavLeft/>
        {/* 这里是右侧区域 */}
        <div className="common-right-box">
          <Header/>
          <div className="common-container">{this.props.children}</div>
        </div>
      </div>
    )
  }
}
