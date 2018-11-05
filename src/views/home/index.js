import React from 'react'
import { Button, Tag, Modal } from 'antd'
import './index.scss'
import execute from '../../utils/execute'
let MarkdownIt = require('markdown-it')
const confirm = Modal.confirm
let md = new MarkdownIt()
export default class Config extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      editor: {},
      loading: false,
      articles: [],
      article: {}
    }
    this.initData()
  }
  /**
   * 初始化编辑器
   */
  initEditor () {
    let editor =  window.Mditor.fromTextarea(document.getElementById('article-viewer'))
    this.setState({ editor })
    // 获取或设置编辑器的值
    editor.on('ready', () => {
      editor.preivew = true
      editor.split = false
      editor.toolbar.items = []
      editor.height = 'auto'
      editor.value = this.state.article.title ? this.state.article.body : ''
    })
  }
  // 设置loading加载
  setLoading (loading = false) {
    this.setState({loading})
  }
  /**
   * @func 点击左侧菜单列表
   * @param {Object} article 当前文章
   */
  changeArticle (article) {
    this.setState({article})
    this.state.editor.value = article.body
  }
  /**
   * 修改文章
   */
  updateArticle () {
    this.props.history.push({
      pathname: 'edit',
      query: this.state.article
    })
  }
  /**
   * 初始化文章数据
   */
  initData () {
    execute('article.list').then(({result, code}) => {
      console.log(result)
      if (code ===200) {
        this.setState({
          articles: result,
          article: result.length ? result[0] : []
        })
      }
      this.initEditor()
      return this.setLoading()
    }).catch( e => {
      return this.setLoading()
    })
  }
  /**
   * 删除文章
   */
  delArticle () {
    let payload = {
      $type: 'article.del',
      draft: this.state.article.draft,
      filename: this.state.article.title
    }
    // 弹框确认
    confirm({
      title: '你确认要删除这篇文章吗?',
      content: '删除后不可恢复，请谨慎操作',
      onOk() {
        execute(payload).then(({result, code}) => {
          if (code ===200) { 
            console.log('删除成功')
          }
        }).catch(err => {
          console.log(err)
        })
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }
  render () {
    return (
      <div className="page-home">
        {/* 这里是左侧列表显示区域 */}
        <div className="page-home-left scrollbar">
          {
            this.state.articles.map((item, index) => {
              return (
                <div className="page-home-left-item" key={ + new Date().getTime() + index} onClick={this.changeArticle.bind(this, item)}>
                  <img src={item.img}/>
                  <div className="item-content">
                    <div className="item-content-title">
                      <p>{item.title}</p>
                      <span>{item.date && item.date.slice(0, 10)}</span>
                    </div>
                    <div className="item-content-subtitle">
                    {
                      item.categories && item.categories.map((category, id) => {
                      return (
                        category && <Tag color="#108ee9" className="category-item" key={ + new Date().getTime() + id}>{category}</Tag>
                      )
                    })}
                    {
                      item.tags && item.tags.map((tag, id) => {
                      return (
                        tag && <Tag color="#87d068" className="tag-item" key={ + new Date().getTime() + id}>{tag}</Tag>
                      )
                    })}
                    </div>
                  </div>
                </div>  
              )
            })
          }
        </div>
        {/* 这里是右侧内容显示区域 */}
        {
          this.state.article.title && 
          <div className="page-home-right scrollbar">
            <div className="front-matter">
              <div className="title">
                <h1>{this.state.article.title}</h1>
                <div className="btns">
                  <Button type="primary" size="small" onClick={this.updateArticle.bind(this)}>修改</Button>
                  {
                    this.state.article.draft && <Button type="warning" size="small">发表</Button>
                  }
                  {
                    !this.state.article.draft && <Button type="warning" size="small">草稿</Button>
                  }
                  <Button type="danger" size="small" onClick={this.delArticle.bind(this)}>删除</Button>
                </div>
              </div>
              <div className="subtitle">
                <span>{this.state.article.date}</span>
                {
                  this.state.article.categories && this.state.article.categories.map((category, id) => {
                  return (
                    category && <Tag color="#108ee9" className="category-item" key={ + new Date().getTime() + id}>{category}</Tag>
                  )
                })}
                {
                  this.state.article.tags && this.state.article.tags.map((tag, id) => {
                  return (
                    tag && <Tag color="#87d068" className="tag-item" key={ + new Date().getTime() + id}>{tag}</Tag>
                  )
                })}
              </div>
            </div>
            <div className="page-home-right-content">
              <textarea id="article-viewer"></textarea>
            </div>
          </div>
        }
      </div>
    )
  }
}