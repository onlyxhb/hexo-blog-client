import React from 'react'
import { Icon } from 'antd'
import './index.scss'
const {ipcRenderer} = window.electron

export default class Config extends React.Component {
  setWindowClose () {
    ipcRenderer.send('window-close')
  }
  setWindowMin () {
    ipcRenderer.send('window-min')
  }
  setWindowMax () {
    ipcRenderer.send('window-max')
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