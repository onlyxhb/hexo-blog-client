import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/posts',
      name: 'posts',
      component: require('@/views/Posts').default
    },
    {
      path: '/create',
      name: 'create',
      component: require('@/views/Create').default
    },
    {
      path: '/preview',
      name: 'preview',
      component: require('@/views/Preview').default
    },
    {
      path: '/edit',
      name: 'edit',
      component: require('@/views/Edit').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/views/Settings').default
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/views/About').default
    },
    {
      path: '*',
      redirect: '/posts'
    }
  ]
})
