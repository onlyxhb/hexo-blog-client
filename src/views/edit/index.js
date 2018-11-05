import React from 'react'
import './index.scss'
import Write from '../../components/Write'

export default class Config extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      article: this.props.location.query
    }
    console.log(this.article)
  }
  render () {
    return (
      <div className="edit-page">
        <Write article={this.state.article}/>
      </div>
    )
  }
}