import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import './assets/style.scss'
import i18n from './locales/i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted() {
    this.$router.push('/')
  }
}).$mount('#app')
