import React from 'react'
import { Button, Tag } from 'antd'
import './index.scss'

const data = [{
  img: '/favicon.ico',
  title: '查贵庭很辛苦很累11112222222222222',
  date: '09-30',
  categories: ['前端'],
  tag: ['vue', 'react', 'js']
}, {
  img: '/favicon.ico',
  title: '我累了',
  date: '08-07',
  categories: ['后端'],
  tag: ['java', 'php', 'node']
}]

export default class Config extends React.Component {

  render () {
    return (
      <div className="page-home">
        {/* 这里是左侧列表显示区域 */}
        <div className="page-home-left">
          {
            data.map(item => {
              return (
                <div className="page-home-left-item">
                  <img src={item.img}/>
                  <div className="item-content">
                    <div className="item-content-title">
                      <p>{item.title}</p>
                      <span>{item.date}</span>
                    </div>
                    <p className="item-content-subtitle">
                      <Tag color="#108ee9" className="category-item">{item.categories.join(',')}</Tag>
                      {item.tag.map(tag => {
                        return (
                          <Tag color="#87d068" className="tag-item">{tag}</Tag>
                        )
                      })}
                    </p>
                  </div>
                </div>  
              )
            })
          }
        </div>
        {/* 这里是右侧内容显示区域 */}
        <div className="page-home-right">
          <div class="front-matter">
            <div className="title">
              <h1>正则常用字符含义</h1>
              <div className="btns">
                <Button type="primary" size="small">修改</Button>
                <Button type="warning" size="small">发表</Button>
                <Button type="danger" size="small">删除</Button>
              </div>
            </div>
            <div class="subtitle">
              <span>2018-10-25 21:47:54</span>
              <Tag color="#108ee9" className="category-item">前端</Tag>
              <Tag color="#87d068" className="tag-item">正则</Tag>
            </div>
          </div>
          <div class="page-home-right-content">
              这里是文章的详情
          </div>
        </div>
      </div>
    )
  }
}