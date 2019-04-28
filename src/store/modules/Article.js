// 记录页面状态
const state = {
  type: 'preview', // 当前操作类型 edit add
  collapse: false, // 左侧列表是否收起
}
const mutations = {
  changeType (state, type) {
    state.type = type
  },
  setCollapse (state, collapse) {
    state.collapse = collapse
  }
}
const actions = {
  // changeType (context, type) {
  //   context.commit('changeType', {
  //     type
  //   })
  // }
}
const getters = {
  type: state => state.type,
  collapse: state => state.collapse
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
