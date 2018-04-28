var WxParse = require('../wxParse/wxParse.js')
var marked = require('../assets/marked.min.js')
var Util = require('../utils/util.js')


const format = (item, self) => {
  WxParse.wxParse('article', 'md', item.con, self, 5)
  item.con = self.data.article.nodes
  item.picture = Util.fetchCDN(item.picture, 'news')
  item.mem.avatar = Util.fetchCDN(item.mem.avatar, 'mem')
  item.timeago = Util.formatTime(item.created_at)
  return item
}


// 处理单挑条新闻数据
var formatComment = (item, self) => {
  // wemark.parse(item.con, self, {
  //   // 新版小程序可自适应宽高
  //   // imageWidth: wx.getSystemInfoSync().windowWidth - 40,
  //   name: 'tmpcon'
  // })
  // item.con = self.data.tmpcon
  // item.mem.avatar = fetchCDN(item.mem.avatar, 'mem')
  // item.timeago = formatime(item.created_at)
  // return item
}


module.exports = {
  format: format
}