import React from 'react'
import './index.scss'

export default class Config extends React.Component {
  render () {
    return (
      <div class="about-page">
        <div>
          <h3>
            说明：这个项目是为了自用，自己的hexo博客新增文章一直使用命令然后再发布，这种命令行的方式很烦而且还不方便，本着分享共同成长的目的，开源了此项目，
            <span style={{'color': 'red','fontWeight': 'bold'}}>欢迎各位同仁发扬光大</span>。
          </h3>
          <ul>
            <li>GitLab：<a href="#">https://gitlab.com/onlystar/hexo-blog.git</a>
            </li>
            <li>Blog：<a href="#">https://blog.onlystar.site</a></li>
          </ul>
        </div>
        <div>
          <h3>使用框架</h3>
          <ul>
            <li><a href="#">Vue.js</a></li>
            <li><a href="#">electron</a></li>
            <li><a href="#">electron-vue</a></li>
            <li><a href="#">element-ui</a></li>
          </ul>
        </div>
      </div>
    )
  }
}