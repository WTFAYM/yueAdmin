// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueResource from 'vue-resource'
import axios from 'axios'
// import VueAxios from 'vue-axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueLazyload from 'vue-lazyload'
import store from './vuex/store'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)
Vue.config.productionTip = false
Vue.use(Element)
// Vue.use(VueResource)
// axios
// Vue.use(VueAxios, axios)
// 在vue原型中添加$http方法等于axios
Vue.prototype.$http = axios
Vue.use(VueLazyload, {
  error: './static/images/error.jpg',
  loading: './static/images/loading.gif',
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: ['scroll']
})
router.beforeEach((to, form, next) => {
  const nextRoute = ['home', 'user', 'dynamic', 'label', 'custom', 'spread', 'addSpread', 'tree', 'notFound', 'gather', 'addGather', 'activity']
  let isLogin = sessionStorage.getItem('admin')
  if (nextRoute.indexOf(to.name) >= 0) {
    console.log(isLogin)
    if (!isLogin) {
      next(
        {name: 'login'}
      )
      return
      // router.replace({name: 'login'})
    }
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  // 组件创建前，进行异步数据数据请求
  beforeCreate () {
    this.$store.dispatch('getAllData', this)
  }
})
