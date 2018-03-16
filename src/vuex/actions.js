const actions = {
  getAllData: async ({commit}, that) => {
    let merchantsList = {}
    await that.$http.get('/api/merchantsData').then((res) => {
      merchantsList = res.data
    })
    commit('getData', {
      merchantsList
    })
  },
  toLogin: async({commit}) => {
    commit('toLogin')
  }
}

export default actions
