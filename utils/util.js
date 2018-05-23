var timeago = require('../assets/timeago.min')

// 发送请求
const request = (action, method, data, successHanlder, completeHanlder) => {
  wx.request({
    url: `https://api.awesomes.cn/${action}`, //仅为示例，并非真实的接口地址
    data: data,
    header: {
      'content-type': 'application/json', // 默认值
      'atoken': (getApp().globalData.session || {}).token
    },
    method: method,
    success: successHanlder,
    complete: completeHanlder
  })
}

// 处理图片地址
const fetchCDN = (name, folder, process) => {
  if (!name || name === '') {
    return null
  }
  // 图片网络地址
  if (/^http(s)?:\/\//.test(name)) {
    return name
  }
  // 本地图片
  if (/^blob:/.test(name)) {
    return name
  }
  let url = `https://awesomes.oss-cn-beijing.aliyuncs.com/${folder}/${name}`
  if (process) {
    url += `?x-oss-process=style/${process}`
  }
  return url
}

// 格式化时间
const formatTime = function (datetime) {
  return timeago().format(datetime, 'zh_CN')
}

module.exports = {
  formatTime: formatTime,
  request: request,
  fetchCDN: fetchCDN
}
