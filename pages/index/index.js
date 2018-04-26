//index.js
var timeago = require('../../assets/timeago.min')
var WxParse = require('../../wxParse/wxParse.js')
var marked = require('../../assets/marked.min.js')

var APIURl = 'https://api.awesomes.cn'
// 处理图片地址
var fetchCDN = (name, folder, process) => {
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


// 时间本地化
var formatime = function (datetime) {
  return timeago().format(datetime, 'zh_CN')
}

var pageSize = 10
var page = 1
var pagetotal = 100


// 处理单挑条新闻数据
var formatItem = (item, self) => {
  
  // console.log(marked(item.con))
  let str = `
<pre>{
    <span class="pl-s">
      <span class="pl-pds">"</span>scripts
      <span class="pl-pds">"</span></span>: {
    <span class="pl-s">
      <span class="pl-pds">"</span>start
      <span class="pl-pds">"</span></span>:
    <span class="pl-s">
      <span class="pl-pds">"</span>nuxt
      <span class="pl-pds">"</span></span>} }
</pre>
`

  // wemark.parse(item.con, self, {
  //   // 新版小程序可自适应宽高
  //   // imageWidth: wx.getSystemInfoSync().windowWidth - 40,
  //   name: 'tmpcon'
  // })
  // item.con = self.data.tmpcon
  WxParse.wxParse('article', 'md', item.con, self, 5)
  item.con = self.data.article.nodes
  item.picture = fetchCDN(item.picture, 'news')
  item.mem.avatar = fetchCDN(item.mem.avatar, 'mem')
  item.timeago = formatime(item.created_at),
  item.comments = []
  return item
}

// 处理单挑条新闻数据
var formatComment = (item, self) => {
  wemark.parse(item.con, self, {
    // 新版小程序可自适应宽高
    // imageWidth: wx.getSystemInfoSync().windowWidth - 40,
    name: 'tmpcon'
  })
  item.con = self.data.tmpcon
  item.mem.avatar = fetchCDN(item.mem.avatar, 'mem')
  item.timeago = formatime(item.created_at)
  return item
}

// 加载数据
var loadData = (self, empty) => {
  if (self.data.isLoading) {
    return
  }

  if (!self.data.hasMore) {
    return
  }

  self.setData({ isLoading: true})
  let _data = {
    limit: pageSize,
    skip: pageSize * (page - 1)
  }
  wx.request({
    url: APIURl + '/news',
    data: _data,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      let items = res.data.items
      let arr = empty ? [] : self.data.newss
      pagetotal = res.data.count
      items.forEach(item => {
        arr.push(formatItem(item, self))
      })
      self.setData({
        newss: arr,
        hasMore: pagetotal > pageSize * page
      })
    },
    complete: function (res) {
      self.setData({
        isLoading: false
      })
      wx.stopPullDownRefresh()
    }
  })
}


//获取应用实例
var app = getApp()
Page({
  data: {
    newss: [],
    tmpcon: {},
    isLoading: false,
    hasMore: true
  },
  // 切换点赞
  switchFavor: function (e) {
    let item = e.currentTarget.dataset.item
    item.isFavor = !item.isFavor
    this.setData({
      item: item
    })
  },
  // 预览图片
  previewImage: function (e) {
    var current = e.currentTarget.dataset.src
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
  onLoad: function () {
    loadData(this)
  },
  
  // 触底
  onReachBottom: function () {
    page += 1
    loadData(this)
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    page = 1
    loadData(this, true)
  }
})
