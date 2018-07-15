var WxParse = require('../wxParse/wxParse.js')
var marked = require('../assets/marked.min.js')
var Util = require('../utils/util.js')


const format = (item, self) => {
  WxParse.wxParse('article', 'md', item.content, self, 5)
  item.content = self.data.article.nodes
  // item.picture = Util.fetchCDN(item.picture, 'news')
  // item.mem.avatar = Util.fetchCDN(item.mem.avatar, 'mem', 'repo-50')
  item.timeago = Util.formatTime(item.created_at)
  return item
}


// 处理单挑条新闻数据
var formatComment = (item, self) => {
  // item.con = self.data.tmpcon
  // item.mem.avatar = Util.fetchCDN(item.mem.avatar, 'mem', 'repo-50')
  item.timeago = Util.formatTime(item.created_at)
  return item
}


module.exports = {
  format: format,
  formatComment: formatComment
}