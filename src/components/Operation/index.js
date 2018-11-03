import React from 'react'
import { Icon } from 'antd'
import './index.scss'
import execute from '../../utils/execute.js'

export default class Config extends React.Component {
  setWindowClose () {
    execute('window.close')
  }
  setWindowMin () {
    execute('window.min')
  }
  setWindowMax () {
    execute('window.max')
  }
  render () {
    return (
      <ul className="common-operation">
        <li onClick={this.setWindowClose.bind(this)}>
          <Icon type="close" className="operate-close"/>
        </li>
        <li onClick={this.setWindowMin.bind(this)}>
          <Icon type="minus" className="operate-min"/>
        </li>
        <li onClick={this.setWindowMax.bind(this)}>
          <Icon type="shrink" className="operate-max"/>
        </li>
      </ul>
    )
  }
}