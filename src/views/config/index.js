import React from 'react'
import './index.scss'
import {Form, Input, Switch, Button} from 'antd'
const {ipcRenderer} = window.electron
const FormItem = Form.Item
const Search = Input.Search

export default class Config extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      path: ''
    }
  }
  getSystemFilePath () {
    ipcRenderer.send('open-file-dialog')
    ipcRenderer.on('selected-directory', (event, path) => {
      this.setState({path: path.join()})
      console.log(path.join())
    })
  }
  cancelBtn () {
    console.log('取消')
    window.close()
  }
  confirmBtn () {
    console.log('确定')
    window.close()
  }
  render () {
    return (
      <div className="config-page">
        <Form>
          <FormItem label="博客路径：">
          <Search
            placeholder="请选择博客在磁盘的路径"
            enterButton="选择"
            size="default"
            onSearch={this.getSystemFilePath.bind(this)}/>
          </FormItem>
          <FormItem label="博客地址：">
            <Input placeholder="请输入博客的线上地址" />
          </FormItem>
          <FormItem label="自动保存：">
            <Switch defaultChecked />
          </FormItem>
          <FormItem className="bottom-btns">
            <Button onClick={this.cancelBtn.bind(this)}>取消</Button>
            <Button type="primary" onClick={this.confirmBtn.bind(this)}>确定</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}