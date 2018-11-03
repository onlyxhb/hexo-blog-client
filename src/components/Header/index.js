import React from 'react'
import { Input, Menu, Icon, Tooltip } from 'antd'
import './index.scss'
import execute from '../../utils/execute.js'
const { shell, ipcRenderer  } = window.electron
const Search = Input.Search

export default class Config extends React.Component {
  openConfig () {
    ipcRenderer.send('open-config')
  }
  openSite () {
    let url = 'https://blog.onlystar.site'
    shell.openExternal(url)
  }
  render () {
    return (
      <div className="common-header">
        <div className="left-items"><Search placeholder="请输入关键词搜索" /></div>
        <div className="right-items">
          <Menu mode="horizontal">
            <Menu.Item>
              <Tooltip placement="bottom" title="刷新列表">
                <Icon type="reload" />
              </Tooltip>
            </Menu.Item>
            <Menu.Item onClick={this.openConfig.bind(this)}>
              <Tooltip placement="bottom" title="系统设置">
                <Icon type="tool" />
              </Tooltip>
            </Menu.Item>
            <Menu.Item onClick={this.openSite.bind(this)}>
              <Tooltip placement="bottom" title="打开博客">
                <Icon type="global" />
              </Tooltip>
            </Menu.Item>
            <Menu.Item>
              <Tooltip placement="bottom" title="编译发布">
                <Icon type="deployment-unit" />
              </Tooltip>
            </Menu.Item>
            <Menu.Item className="item-img">
              <img src="favicon.ico"/>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    )
  }
}