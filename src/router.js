import React from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Config from './views/config'
import Main from './main'
import Home from './views/home'
import Preview from './views/preview'
import Add from './views/add'
import Edit from './views/edit'
import About from './views/about'
import Setting from './views/setting'

export default class ERouter extends React.Component {
  render () {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/config" component={Config} />
            <Route path="/" render={() =>
              <Main>
                <Switch>
                  <Route path='/home' component={Home} />
                  <Route path='/preview' component={Preview} />
                  <Route path='/add' component={Add} />
                  <Route path='/edit' component={Edit} />
                  <Route path='/about' component={About} />
                  <Route path='/setting' component={Setting} />
                  <Redirect to="/home" /> 
                </Switch>
              </Main>
            } />
          </Switch>
        </App>
      </HashRouter>
    )
  }
}