export default {
  DateTran (value) {
    if (value) {
      let val = new Date(value)
      let tmp_month = val.getMonth() + 1
      let month = tmp_month > 10 ? '' + tmp_month : '0' + tmp_month
      let day = val.getDate() > 10 ? '' + val.getDate() : '0' + val.getDate()
      let temp_h = val.getHours()
      let h = temp_h > 10 ? '' + temp_h : '0' + temp_h
      let temp_m = val.getMinutes()
      let m = temp_m > 10 ? '' + temp_m : '0' + temp_m
      return val.getFullYear() + '-' + month + '-' + day + ' ' + h + ':' + m
    } else {
      return value
    }
  },
  DateTranDay (value) {
    if (value) {
      let val = new Date(value)
      let tmp_month = val.getMonth() + 1
      let month = tmp_month > 10 ? '' + tmp_month : '0' + tmp_month
      let day = val.getDate() > 10 ? '' + val.getDate() : '0' + val.getDate()
      return val.getFullYear() + '-' + month + '-' + day
    } else {
      return value
    }
  }
}
