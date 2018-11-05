import React from 'react'
import { Form, Input, Button, Dropdown, Select, Icon, DatePicker, Switch } from 'antd'
import moment from 'moment'
import execute from '../../utils/execute'
import './index.scss'
const FormItem = Form.Item
const Option = Select.Option

class Write extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editor: null,
      article: props.article || {}
    }
  }
  componentDidMount(){
    let editor =  window.Mditor.fromTextarea(document.getElementById('md_editor'))
    this.setState({ editor })
    // 获取或设置编辑器的值
    editor.on('ready', () => {
      let article = this.state.article
      article.body && (editor.value = article.body)
      this.configEditor()
      console.log(editor)
    })
  }
  configEditor () {
    // 计算编辑器的高度
    let h = window.innerHeight - 55 - 84 - 44 -84 - 60 - 20
    console.log(h)
    this.state.editor.height =  h > 400 ? `${h}px` : '400px'
    //替换按钮动作
    let btn = this.state.editor.toolbar.getItem('image')
    btn.handler = () => {
      console.log('处理图片上传')
    }
  }
  changeSwitch (field, checked) {
    let article = this.state.article
    article[field] = checked
    this.setState({
      article
    })
  }
  // 取消返回
  cancelBtn () {
    window.history.back()
  }
  // 保存文章
  saveArticle (draft) {
    this.props.form.validateFields((err, values) => {
      let article = {}
      Object.assign(article, values)
      article.top = this.state.article.top
      article.toc = this.state.article.toc
      article.body = this.state.editor.value
      article.updated = moment().format('YYYY-MM-DD HH:mm:ss')
      if (this.state.article.date) {
        article.date = this.state.article.date
      } else {
        article.date = article.updated
      }
      const payload = {
        $type: 'article.save',
        draft,
        prevState: !!(+this.state.article.draft),
        article,
        filename: this.state.article.filename || article.title
      }
      console.log(payload)
      execute(payload).then(res => {
        new window.Notification('友情提示', {
          title: '友情提示',
          body: '文章保存成功'
        })
      }).catch(err => {
        console.log(err)
      })
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="write-page">
        <Form>
          <FormItem label="标题">
            {
              getFieldDecorator('title', {
                initialValue: this.state.article.title,
                // rules: [
                //   { required: true, message: '请输入标题' }
                // ]
              })(
                <Input placeholder="请输入标题..."/>
              )
            }
          </FormItem>
          <FormItem label="内容" className="editor-item">
            <textarea id="md_editor"></textarea>
          </FormItem>
          <FormItem className="write-item-inline">
            <FormItem label="分类">
              {
                getFieldDecorator('categories', {
                // rules: [
                //   { required: true, message: '请选择你的分类', type: 'array'  }
                // ],
                initialValue: this.state.article.categories || []
              })(
                <Select mode="tags">
                  <Option key="前端">前端</Option>
                  <Option key="后端">后端</Option>
                  <Option key="测试">测试</Option>
                </Select>
              )
              }
            </FormItem>
            <FormItem label="标签">
              {
                getFieldDecorator('tags', {
                // rules: [
                //   { required: true, message: '请选择你的标签', type: 'array'  }
                // ],
                initialValue: this.state.article.tags || []
              })(
                <Select mode="tags">
                  <Option key="js">js</Option>
                  <Option key="css">css</Option>
                  <Option key="正则">正则</Option>
                  <Option key="监控">监控</Option>
                  <Option key="git">git</Option>
                  <Option key="vue">vue</Option>
                  <Option key="bug">bug</Option>
                  <Option key="linux">linux</Option>
                </Select>
              )
              }
            </FormItem>
            <FormItem label="时间">
              {
                getFieldDecorator('date', {
                  // rules: [
                  //   { required: true, message: '请选择时间' }
                  // ],
                  initialValue: moment(this.state.article.date)
              })(
                <DatePicker format="YYYY-MM-DD"/>
              )
              }
            </FormItem>
          </FormItem>
          <FormItem label="封面图片">
            {
              getFieldDecorator('img', {
                // rules: [
                //   { required: true, message: '请选择封面图片' }
                // ],
                initialValue: this.state.article.img
              })(
                <Input placeholder="请输入图片地址..."/>
              )
            }
          </FormItem>
          <FormItem className="write-item-bottom">
            <div className="left">
              <FormItem label="推荐">
                {
                  <Switch checked={this.state.article.top} onChange={this.changeSwitch.bind(this, 'top')}/>
                }
              </FormItem>
              <FormItem label="文章目录">
                {
                  <Switch checked={this.state.article.toc} onChange={this.changeSwitch.bind(this, 'toc')}/>
                }
              </FormItem>
            </div>
            <div className="bottom-btns">
              <Button type="warning" onClick={this.saveArticle.bind(this, true)}>草稿</Button>
              <Button type="primary" onClick={this.saveArticle.bind(this, false)}>发表</Button>
              <Button onClick={this.cancelBtn.bind(this)}>取消</Button>
            </div>       
          </FormItem>
        </Form>
      </div>
    )
  }
}
export default Form.create()(Write)