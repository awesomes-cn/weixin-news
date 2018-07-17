//index.js
var Util = require('../../utils/util.js')
var NewsUtil = require('../../utils/news.js')

//获取应用实例
var app = getApp()
Page({
  data: {
    newss: {},
    tmpcon: {},
    tid: 0,
    isLoading: false,
    hasMore: true
  },

  // 加载数据
  fetchData: function (empty) {
    if (this.data.isLoading) {
      return
    }
    this.setData({ isLoading: true })

    Util.request('topic/' + this.data.tid, 'GET', {
    }, res => {
      let aritem = NewsUtil.format(res.data.data[0], this)

      this.setData({
        newss: aritem
      })
    }, () => {
      this.setData({
        isLoading: false
      })
      wx.stopPullDownRefresh()
    })
  },

  onLoad: function (options) {
    this.setData({
      tid: options.id
    })
    this.fetchData()
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    page = 1
    this.fetchData(true)
  }
})
