import React from 'react'
import { Button, Tag } from 'antd'
import './index.scss'
import execute from '../../utils/execute'
export default class Config extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      articles: []
    }
    this.initData()
  }
  setLoading (loading = false) {
    this.setState({loading})
  }
  initData () {
    execute('article.list').then(({result, code}) => {
      console.log(result)
      if (code ===200) {
        this.state.articles = result
      }
      return this.setLoading()
    }).catch( e => {
      return this.setLoading()
    })
  }

  render () {
    return (
      <div className="page-home">
        {/* 这里是左侧列表显示区域 */}
        <div className="page-home-left">
          {
            this.state.articles.map((item, index) => {
              return (
                <div className="page-home-left-item" key={ + new Date().getTime() + index}>
                  <img src={item.img}/>
                  <div className="item-content">
                    <div className="item-content-title">
                      <p>{item.title}</p>
                      <span>{item.date}</span>
                    </div>
                    <div className="item-content-subtitle">
                    {
                      item.categories && <Tag color="#108ee9" className="category-item">
                        {item.categories.join(',')}
                      </Tag>
                    }
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
        <div className="page-home-right">
          <div className="front-matter">
            <div className="title">
              <h1>正则常用字符含义</h1>
              <div className="btns">
                <Button type="primary" size="small">修改</Button>
                <Button type="warning" size="small">发表</Button>
                <Button type="danger" size="small">删除</Button>
              </div>
            </div>
            <div className="subtitle">
              <span>2018-10-25 21:47:54</span>
              <Tag color="#108ee9" className="category-item">前端</Tag>
              <Tag color="#87d068" className="tag-item">正则</Tag>
            </div>
          </div>
          <div className="page-home-right-content">
              这里是文章的详情
          </div>
        </div>
      </div>
    )
  }
}