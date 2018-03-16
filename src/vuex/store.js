import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
/**
 * Created by Almon on 2017/10/10.
 */
Vue.use(Vuex)

let state = {
  // 初始化数据
  data: {merchantsList: []},
  // 异步请求是否结束
  isAjax: false,
  // 是否登录成功
  isLogin: false,
  result: '',
  enter: ''
}
// 导出一个新生成的Store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
