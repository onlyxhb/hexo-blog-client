import React from 'react'
import './index.scss'
import {Form, Input, Button} from 'antd'
const FormItem = Form.Item

export default class Config extends React.Component {
  cancelBtn () {
    console.log('取消')
  }
  confirmBtn () {
    console.log('确定')
  }
  render () {
    return (
      <div className="setting-page">
        <Form>
          <FormItem label="七牛AK：">
            <Input placeholder="请输入七牛的AccessKey" />
          </FormItem>
          <FormItem label="七牛SK：">
            <Input placeholder="请输入七牛的SecretKey" />
          </FormItem>
          <FormItem label="七牛Bucket：">
            <Input placeholder="请输入七牛的Bucket" />
          </FormItem>
          <FormItem label="七牛域名：">
            <Input placeholder="请输入七牛的域名" />
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