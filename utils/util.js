const calendar = require('calendar.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const solarTime = date => {
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}

const lunarTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  console.log(calendar.solar2lunar(year, month, day))
  const lunarObjet = calendar.solar2lunar(year, month, day)
  return lunarObjet.gzYear + lunarObjet.Animal + '年' + '农历' + lunarObjet.IMonthCn + lunarObjet.IDayCn
}

const closestTerm = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const iday = date.getDate()
  const firstTermDay = calendar.getTerm(year, month * 2 - 1)
  const secondTermDay = calendar.getTerm(year, month * 2)
  if (iday < firstTermDay) {
    const term = calendar.solarTerm[month * 2 - 2]
    return {
      term: term,
      day: firstTermDay,
      daysLeft: firstTermDay - iday
    }
  } else if (iday < secondTermDay) {
    const term = calendar.solarTerm[month * 2 - 1]
    return {
      term: term,
      day: secondTermDay,
      daysLeft: secondTermDay - iday
    }
  } else if (iday > secondTermDay) {
    const nextFirstTermDay = calendar.getTerm(year, (month + 1) * 2 - 1)
    const term = calendar.solarTerm[(month + 1) * 2 - 2]
    return {
      term: term,
      day: nextFirstTermDay,
      //当月剩余天数+下个月第一个节气的时间
      daysLeft: calendar.solarDays(year, month) - iday + nextFirstTermDay
    }
  }
}

module.exports = {
  formatTime: formatTime,
  solarTime: solarTime,
  lunarTime: lunarTime,
  closestTerm: closestTerm
}
