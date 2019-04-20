// 记录页面状态
const state = {
  type: 'preview' // 当前操作类型 edit add
}
const mutations = {
  changeType (state, type) {
    state.type = type
  }
}
const actions = {
  changeType (context, type) {
    context.commit('changeType', {
      type
    })
  }
}
const getters = {
  type: state => state.type
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
