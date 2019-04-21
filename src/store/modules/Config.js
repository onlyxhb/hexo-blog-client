import Config from '@/config'

const state = {
  config: {}
}

const mutations = {
  updateConfig (state, config) {
    state.config = config
  },
  setPhoto (state, photoPic) {
    console.log('修改了图片路径：' + photoPic)
    state.config.photoPic = photoPic
  }
}

const actions = {
  async initConfig (context) {
    context.commit('updateConfig', Config.all())
  },
  async setConfig (context, options) {
    Config.setAll(options)
    context.dispatch('initConfig')
  }
}

const getters = {
  config: state => state.config
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
