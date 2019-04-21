// 记录页面状态
const state = {
  dialogFormVisible: false
}
const mutations = {
  setDialogFormVisible (state, visible) {
    state.dialogFormVisible = visible
  }
}
const actions = {
  setDialogFormVisible (context, visible) {
    context.commit('setDialogFormVisible', visible)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
