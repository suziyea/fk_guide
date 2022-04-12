import validator from '@/utils/validator'
export default {
  formatDate (date, fmt) {
    /**
     * date:需要格式化的日期Date()类型
     * fmt：日期格式 yyyy-MM-dd
     * @param  {[Date,str]} y [description]
     * @return {[type]}   [description]
     */
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
      }
    }
    return fmt
  },
  formatNumber (number, decimals, dec_point, thousands_sep) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        let k = Math.pow(10, prec)
        return '' + Math.ceil(n * k) / k
      }

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
  },
  getAgeByBirthday (strBirthday) {
    /**
     *参数strBirthday已经是正确格式的2017-12-12这样的日期字符串
     */
    let returnAge = null
    let strBirthdayArr = strBirthday.split('-')
    let birthYear = strBirthdayArr[0]
    let birthMonth = strBirthdayArr[1]
    let birthDay = strBirthdayArr[2]

    let d = new Date()
    let nowYear = d.getFullYear()
    let nowMonth = d.getMonth() + 1
    let nowDay = d.getDate()

    if (nowYear == birthYear) {
      returnAge = 0 //同年 则为0岁
    } else {
      let ageDiff = nowYear - birthYear //年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          let dayDiff = nowDay - birthDay //日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        } else {
          let monthDiff = nowMonth - birthMonth //月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        }
      } else {
        returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge //返回周岁年龄
  },
  /**
   * @param idCard
   */
  getBirthdayByIdNo (idCard) {
    let birthday = ''
    if (idCard != null && idCard != '') {
      if (idCard.length == 15) {
        birthday = '19' + idCard.slice(6, 12)
      } else if (idCard.length == 18) {
        birthday = idCard.slice(6, 14)
      }
      birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
      //通过正则表达式来指定输出格式为:1990-01-01
    }
    return birthday
  },
  /**
   * @param idCard
   * '0' 男
   * '1' 女
   */
  getSexByBirthday (idCard) {
    let sexStr = ''
    if (parseInt(idCard.slice(-2, -1),10) % 2 == 1) {
      sexStr = '0'
    } else {
      sexStr = '1'
    }
    return sexStr
  },

  /**
   * 根据年龄和年龄单位计算日期 年龄单位默认岁 年龄默认0
   * @param {*} age 年龄
   * @param {*} ageFlag 年龄单位  目前只支持岁和天 根据后期需要可添加
   */
  getBirthdayByAge (age = 0, ageFlag = 'A') {
    let d = new Date()
    if (validator.isEmpty(age)) {
      switch (ageFlag) {
        case 'A': //岁
          d.setFullYear(d.getFullYear() - (age - 0))
          break
        case 'D': //天
          d.setDate(d.getDate() - (age - 0))
          break
      }
    }
    return d
  },
  getAgeDayByBirthday (birthday) {
    if (validator.isEmpty(birthday)) {
      return parseInt(
        (new Date().getTime() - new Date(birthday).setHours(0)) / 1000 / 3600 / 24,10)
    } else {
      return 0
    }
  },
  dateFormatDate (value) {
    // var dateFmt = new Date(value).getTime()
    // ios下不支持‘-’的日期格式，需要替换成‘/’
    var date = new Date(value.replace(/\-/g, "/"))
    // var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'

    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes()
    // return M + D + h + m
    return M + this.getZero(D) + this.getZero(h) + this.getZero(m)
  },
  getZero (num) { // 个位数前补0
    if (parseInt(num,10) < 10) {
      num = '0' + num
    }
    return num
  },
  //格式化数据超出显示...
  formatStrLength (value, length) {
    return value.length > length ? value.substring(0, length).concat('...') : value
  },
  /**
   * 获取url参数
   * @param {*} url 
   * @param {*} name 
   * @returns object
   */
  getUrlParams (url, name) {
    var temp1 = url.split("?")
    var pram = temp1[1]
    var keyValue = pram.split("&")
    var obj = {}
    for (var i = 0; i < keyValue.length; i++) {
      var item = keyValue[i].split("=")
      var key = item[0]
      var value = item[1]
      obj[key] = value
    }
    // 返回结果
    return obj
  },
  /**
   * 保留两位小数 自动去0
   * @param {*} num 
   * @returns 
   */
  keepTwoDecimal (num) {
    if(num == 0){
      return parseInt(num,0).toFixed(2)
    }
    var result = parseFloat(num)
    if (isNaN(result)) {
      return false
    }
    result = Math.round(num * 100) / 100
    return result
  },
  /**
   * 格式化空数据 formatDataView
   * @param {*} value 转换值
   * @param {*} toValue 转化的格式 转换值
   * @param {*} isToFormat 转化的格式 转换值
   * @param {*} reg 1.直接返回原数据（默认值）2.保留两位小数添加百分号3.保留两位小数不添加百分号
   */
  formatDataView (params) {
    let { value, toValue, isToFormat, reg } = params
    if (value == '--') {
      return value
    }
    if (value == 0 && isToFormat) {
      return toValue
    }
    if (!validator.isEmpty(value)) {
      return '--'
    }
    if (reg == '2') {
      return this.keepTwoDecimal(value) + '%'
    }
    if (reg == '3') {
      return this.keepTwoDecimal(value)
    }
    return value
  }
}