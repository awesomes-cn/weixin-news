//index.js
var Util = require('../../utils/util.js')
var NewsUtil = require('../../utils/news.js')

//获取应用实例
var app = getApp()
Page({
  data: {
    topics: {},
    isLoading: false,
    hasMore: true
  },

  // 加载数据
  fetchData: function (empty) {
    if (this.data.isLoading) {
      return
    }
    this.setData({ isLoading: true })

    Util.request('topic', 'GET', {
    }, res => {
      this.setData({
        topics: res.data.data
      })
    }, () => {
      this.setData({
        isLoading: false
      })
      wx.stopPullDownRefresh()
    })
  },

  onLoad: function () {
    this.fetchData()
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    page = 1
    this.fetchData(true)
  }
})
