import React from 'react'
import { Form, Input, Button, Dropdown, Menu, Icon, DatePicker, Switch } from 'antd'
import './index.scss'
const FormItem = Form.Item

export default class Write extends React.Component {
  state = {
    editor: null
  }
  componentDidMount(){
    let editor =  window.Mditor.fromTextarea(document.getElementById('md_editor'))
    this.setState({ editor })
    // 获取或设置编辑器的值
    editor.on('ready', () => {
      this.configEditor()
    })
  }
  configEditor () {
    let btn = this.state.editor.toolbar.getItem('image')
    //替换按钮动作
    btn.handler = () => {
      console.log('处理图片上传')
    }
  }
  cancelBtn () {
    console.log('取消')
  }
  confirmBtn () {
    console.log('确定')
  }
  render () {
    const menu = (
      <Menu>
        <Menu.Item key="1">前端</Menu.Item>
        <Menu.Item key="2">后端</Menu.Item>
        <Menu.Item key="3">测试</Menu.Item>
      </Menu>
    )
    return (
      <div className="write-page">
        <Form>
          <FormItem label="标题">
            <Input placeholder="请输入标题..." />
          </FormItem>
          <FormItem label="内容">
            <textarea id="md_editor"></textarea>
          </FormItem>
          <FormItem className="write-item-inline">
            <FormItem label="分类">
              <Dropdown overlay={menu}>
                <Button style={{ marginLeft: 8 }}>
                  Button <Icon type="down" />
                </Button>
              </Dropdown>
            </FormItem>
            <FormItem label="标签">
              <Dropdown overlay={menu}>
                <Button style={{ marginLeft: 8 }}>
                  Button <Icon type="down" />
                </Button>
              </Dropdown>
            </FormItem>
            <FormItem label="时间">
              <DatePicker />
            </FormItem>
          </FormItem>
          <FormItem label="封面图片">
            <Input placeholder="请输入图片地址..." />
          </FormItem>
          <FormItem className="write-item-bottom">
            <div className="left">
              <FormItem label="推荐"><Switch/></FormItem>
              <FormItem label="文章目录"><Switch/></FormItem>
            </div>
            <div className="bottom-btns">
              <Button type="warning" onClick={this.confirmBtn.bind(this)}>发表</Button>
              <Button type="primary" onClick={this.confirmBtn.bind(this)}>保存</Button>
              <Button onClick={this.cancelBtn.bind(this)}>取消</Button>
            </div>       
          </FormItem>
        </Form>
      </div>
    )
  }
}