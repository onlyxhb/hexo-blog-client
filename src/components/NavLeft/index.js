import React from 'react'
import './index.scss'
import Operation from '../Operation'
import { Menu, Icon, Tooltip } from 'antd'
import PropTypes from "prop-types"
export default class Config extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context)
    this.state = { selectKeys: ['/'] }
  }
  componentWillMount () {
    let selectKeys = [this.context.router.history.location.pathname]
    this.setState({ selectKeys })
  }
  handleClick (data) {
    let selectKeys = [data.key]
    this.setState({selectKeys})
    this.context.router.history.push(data.key)
  }
  render () {
    return (
      <div className="common-left">
        <Operation/>
        <Menu defaultSelectedKeys={this.state.selectKeys} onClick={this.handleClick.bind(this)}>
          <Menu.Item key="/">
            <Tooltip placement="right" title="文章">
              <Icon type="ordered-list" />
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="/add">
            <Tooltip placement="right" title="新建">
              <Icon type="plus" />
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="/setting">
            <Tooltip placement="right" title="设置">
              <Icon type="setting" />
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="/preview">
            <Tooltip placement="right" title="预览">
              <Icon type="read" />
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="/about">
            <Tooltip placement="right" title="关于">
              <Icon type="info-circle" />
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="/edit" className="menu-bottom">
            <Tooltip placement="right" title="编辑">
              <Icon type="table" />
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="/add" className="menu-bottom">
            <Tooltip placement="right" title="其他">
              <Icon type="bars" />
            </Tooltip>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}