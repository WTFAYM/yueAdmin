/**
 * Created by Almon on 2017/10/10.
 */
// vuex中state的数据只能被mutations方法所更改

const mutations = {
  // 获取数据
  getData: (state, data) => {
    state.data = data
    // state.isAjax = true
  },
  toLogin: (state) => {
    state.isLogin = true
  },
  calculate: (state, value) => {
    if (value === '=') {
      state.result = evil(state.enter)
      state.enter += value
    } else if (value === 'clear') {
      state.result = state.enter = ''
    } else {
      state.enter += value
    }
    // 代替eval,eslint禁用eval
    function evil (fn) {
      var Fn = Function
      return new Fn('return ' + fn)()
    }
  }
}

export default mutations
