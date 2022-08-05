const state = () => ({
  navopen:false,
  navismini:false,
})

const actions = {

}

const getters = {

}

const mutations = {
  navopen (state, navstate){
    state.navopen = navstate;
  },
  navismini (state, ministate){
    state.navismini = ministate;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
