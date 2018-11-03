import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render() {
    return (
      <div class="root-box">
        {this.props.children}
      </div>
    )
  }
}

export default App
