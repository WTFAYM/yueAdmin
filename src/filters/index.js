export default {
  install (Vue) {
    Vue.filter('DateTran', tools.DateTran)
    Vue.filter('DateTranDay', tools.DateTranDay)
  }
}
