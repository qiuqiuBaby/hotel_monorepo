// 格式化时间戳
export const formatTime = (timestamp, format = 'YYYY-MM-DD') => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const tokens = {
    YYYY: year.toString(),
    YY: year.toString().slice(-2),
    MM: month.toString().padStart(2, '0'),
    M: month.toString(),
    DD: day.toString().padStart(2, '0'),
    D: day.toString(),
    HH: hours.toString().padStart(2, '0'),
    H: hours.toString(),
    mm: minutes.toString().padStart(2, '0'),
    m: minutes.toString(),
    ss: seconds.toString().padStart(2, '0'),
    s: seconds.toString(),
  }

  return format.replace(/YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s/g, match => tokens[match])
}

// 判断两个日期之间的月份差是否在范围之外
export const isMoreThanMonthsApart = (startDate, endDate, numMonths = 1): Boolean => {
  startDate = new Date(startDate)
  endDate = new Date(endDate)
  // 获取起始日期和结束日期的年、月、日
  const startYear = startDate.getFullYear()
  const startMonth = startDate.getMonth()
  const startDay = startDate.getDate()
  const endYear = endDate.getFullYear()
  const endMonth = endDate.getMonth()
  const endDay = endDate.getDate()

  // 计算起始日期的 numMonths 个月后的日期
  const nextMonthsDate = new Date(startYear, startMonth + numMonths, startDay)

  // 判断结束日期是否在起始日期的 numMonths 个月后同一日期之后
  const isAfterNextMonthsDate
    = endYear > nextMonthsDate.getFullYear()
    || (endYear === nextMonthsDate.getFullYear() && endMonth > nextMonthsDate.getMonth())
    || (endYear === nextMonthsDate.getFullYear() && endMonth === nextMonthsDate.getMonth() && endDay > startDay)

  if (isAfterNextMonthsDate)
    return true // 间隔大于 numMonths 个月
  else return false // 间隔小于等于 numMonths 个月
}

// 日期月份/天的显示，如果是1位数，则在前面加上'0'
export const getFormatDate = (arg) => {
  if (arg === undefined || arg === '')
    return ''

  let re = `${arg}`
  if (re.length < 2)
    re = `0${re}`

  return re
}

// 日期，在原有日期基础上，增加days天数，默认增加1天
export const addDate = (date, days = 1, splitStr) => {
  const newdDate = new Date(date)
  newdDate.setDate(newdDate.getDate() + days)
  const month = newdDate.getMonth() + 1
  const day = newdDate.getDate()
  return `${newdDate.getFullYear()}${splitStr}${getFormatDate(month)}${splitStr}${getFormatDate(day)}`
}

// 判断链各个时间跨度天数
export const timeSpanJudge = (startTime, endTime) => {
  const newStartTime = new Date(startTime).getTime()
  const newEndTime = new Date(endTime).getTime()
  if (!isNaN(newStartTime) && !isNaN(newEndTime)) {
    const timeDiff = new Date(newEndTime).getTime() - new Date(newStartTime).getTime() // 时间差的毫秒数
    return Math.floor(timeDiff / (24 * 3600 * 1000))
  }
  else {
    return 0
  }
}

// 搜索时间优化 startDom: 开始时间Dom，endDom:结束时间Dom,dayOrYear:时间跨度类型，dateSpan:时间跨度, isNeedHMS: 是否需要时分秒
// export const searchTimeOptimize = (startDom, endDom, dayOrYear, dateSpan, isNeedHMS = true) => {
//   const startTime = startDom.val()
//   const endTime = endDom.val()
//   const mark = startTime ? 1 : -1
//   const currDate = (startTime || endTime) ? new Date(startTime || endTime) : new Date()
//   const getFn = dayOrYear === 'day' ? currDate.getDate() : currDate.getFullYear()
//   const setFn
//       = dayOrYear === 'day'
//         ? function (time) {
//           return currDate.setDate(time)
//         }
//         : function (time) {
//           return currDate.setFullYear(time)
//         }
//   const newTime = Number(getFn) + Number(dateSpan) * mark - (!isNeedHMS && 1)
//   const tTime = new Date(setFn(newTime))

//   if (startTime && endTime) {
//     // 起止时间都有
//     if (dayOrYear === 'day') {
//       // 时间跨度为天数
//       if (timeSpanJudge(startTime, endTime) <= dateSpan)
//         return
//     }
//     else if (dayOrYear === 'year') {
//       // 时间跨度为年
//       if (new Date(endTime).getFullYear() - new Date(startTime).getFullYear() <= dateSpan)
//         return
//     }
//   }
//   // eslint-disable-next-line no-unused-expressions
//   startTime
//       || (startDom.val(tTime.dateFormat(`yyyy-MM-dd${isNeedHMS ? ' hh:mm:ss' : ''}`)),
//       endTime || endDom.val(new Date().dateFormat(`yyyy-MM-dd${isNeedHMS ? ' hh:mm:ss' : ''}`)))
//   startTime && endDom.val(tTime.dateFormat(`yyyy-MM-dd${isNeedHMS ? ' hh:mm:ss' : ''}`))
// }

// 日期方法
export const dateUtil = {
  /*
   * 取传入日期是星期几
   * 使用方法：dateUtil.nowFewWeeks(new Date());
   * @param date{date} 传入日期类型
   * @returns {星期四，...}
   */
  nowIsWeeks(date) {
    if (date instanceof Date) {
      const dayNames = [7, 1, 2, 3, 4, 5, 6]
      return dayNames[date.getDay()]
    }
    else {
      return 'Param error,date type!'
    }
  },
}

/*
   * @description距离n日期后的日期 原生计算方法
   * @param d [obj] 起始日期对象
   * @param n [number] n个月之后的日期 且 必须为整数
   * @param type [number] 类型 0 ：年,1 ：月,2 ： 日,3 ： 时,4 ： 分,5 ： 秒,6 ：毫秒
   * */
export const nativeDateLater = (d, n, type) => {
  if (n === 0)
    return d

  switch (true) {
    case type === 0:
      d.setYear(d.getFullYear() + n)
      break
    case type === 1:
      d.setMonth(d.getMonth() + n)
      break
    case type === 2:
      d.setDate(d.getDate() + n)
      break
    case type === 3:
      d.setHours(d.getHours() + n)
      break
    case type === 4:
      d.setMinutes(d.getMinutes() + n)
      break
    case type === 5:
      d.setSeconds(d.getSeconds() + n)
      break
    case type === 6:
      d.setMilliseconds(d.getMilliseconds() + n)
      break
    default:
      console.error('需要计算的类型设置错误!')
      break
  }
  return d
}

// 获取两个日期中间的所有日期
export const getTwoDateMiddleAllDate = (stime: string, etime: string) => {
  // 初始化日期列表，数组
  const diffdate: any[] = []
  let i = 0
  // 开始日期小于等于结束日期,并循环
  while (stime <= etime) {
    diffdate[i] = stime

    // 获取开始日期时间戳
    const stime_ts = new Date(stime).getTime()

    // 增加一天时间戳后的日期
    const next_date = stime_ts + (24 * 60 * 60 * 1000)

    // 拼接年月日，这里的月份会返回（0-11），所以要+1
    const dateList: any[] = []
    dateList.push(new Date(next_date).getFullYear())
    dateList.push((`00${new Date(next_date).getMonth() + 1}`).substr(-2))
    dateList.push((`00${new Date(next_date).getDate()}`).substr(-2))
    stime = dateList.join('-')

    // 增加数组key
    i++
  }
  return diffdate
}

/**
 * 获取指定日期的前一天，后一天
 * @param date 代表指定的日期，格式：2018-09-27
 * @param day 传-1表始前一天，传1表始后一天
 * @returns
 */
export const getNextDate = (date: string, day: number): string => {
  const dd = new Date(date)
  dd.setDate(dd.getDate() + day)
  const y = dd.getFullYear()
  const m = dd.getMonth() + 1 < 10 ? `0${dd.getMonth() + 1}` : dd.getMonth() + 1
  const d = dd.getDate() < 10 ? `0${dd.getDate()}` : dd.getDate()
  return `${y}-${m}-${d}`
}
